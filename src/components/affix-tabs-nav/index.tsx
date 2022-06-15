import cn from 'classnames';
import { find, get, some, throttle } from 'lodash';
import React from 'react';
import { Affix, IAffixProps, ITab, ITabsProps, Tabs } from 'zent';

interface IAffixTab<T> extends ITab<T> {
  target: string;
  hidden?: boolean;
}

interface IAffixTabsProps<T> extends ITabsProps<T> {
  defaultActiveId: T;
  tabs: Array<IAffixTab<T>>;
}

interface IProps<TId extends React.ReactText> {
  offset?: number;
  pinClassName?: string;
  affixProps?: IAffixProps;
  tabsProps: Partial<IAffixTabsProps<TId>>;
  onActiveIdChange?: (key: string) => void;
}

/**
 * 给定 目标元素 或 目标选择器 滚动到对应位置
 * @param target string | HTMLElement
 * @param offset number
 */
const scrollTo = (target: string | HTMLElement, offset = 0) => {
  if (!target) return;

  let $target: HTMLElement | null;
  if (typeof target === 'string') {
    $target = document.querySelector(target);
  } else {
    $target = target;
  }

  if ($target) {
    const targetTop = $target.getBoundingClientRect().top + (document.documentElement || document.body).scrollTop;
    const offsetTop = targetTop - offset;
    window.scrollTo({ top: offsetTop!, behavior: 'smooth' });
  }
};

/**
 * Affix + Tabs 组成的固定导航
 * tabsProps 属性会覆盖内部的非受控逻辑 activeId + onChange
 * @param props
 */
function AffixTabsNav<T extends React.ReactText>(props: IProps<T>): React.ReactElement {
  const { affixProps, tabsProps, offset, pinClassName = 'rc__affix-tabs-nav__wrap--pined', onActiveIdChange } = props;

  // 计算默认 选中
  const defaultActiveId = React.useMemo(() => {
    return tabsProps.defaultActiveId || get(tabsProps, 'tabs[0]key');
  }, [tabsProps]);

  // 处理非受控逻辑
  const [activeId, setActiveId] = React.useState<T>(defaultActiveId);
  const handleChange = React.useCallback(
    (activeId) => {
      const tab = find(tabsProps.tabs, (tab) => tab.key === activeId);
      if (tab?.key) {
        scrollTo(tab.target, offset);
      }

      setActiveId(activeId);
      onActiveIdChange?.(activeId);
    },
    [tabsProps, offset, onActiveIdChange]
  );

  // 处理滚动逻辑
  React.useEffect(() => {
    const timeout = 100;
    // 滚动完成后的处理
    const scrollEndFix = () => {
      let minDistance = 9999;
      let targetId: T | null = null;
      some(tabsProps.tabs, (tab: any) => {
        const dis = Math.abs(document.querySelector(tab.target)?.getBoundingClientRect()?.top ?? 9999);
        if (dis > minDistance) {
          return true;
        }

        if (dis <= minDistance) {
          targetId = tab.key;
          minDistance = dis;
          return false;
        }
      });
      if (targetId !== null) {
        setActiveId(targetId);
      }
    };
    scrollEndFix.timer = (0 as unknown) as NodeJS.Timeout;

    // 滚动处理
    const scrollHandler = () => {
      some(tabsProps.tabs, (tab: any) => {
        const $target = document.querySelector(tab.target);
        if (!$target) return;

        const rect = $target.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        const distanceOffset = Math.max(offset || 0, 48);

        if (distance <= distanceOffset) {
          setActiveId(tab.key);
          return true;
        }
      });

      clearTimeout(scrollEndFix.timer);
      scrollEndFix.timer = setTimeout(() => {
        scrollEndFix();
      }, timeout * 2);
    };
    const throttledHandler = throttle(scrollHandler, timeout);
    window.addEventListener('scroll', throttledHandler);

    return () => {
      window.removeEventListener('scroll', throttledHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActiveId, tabsProps, offset]);

  // props 处理
  const { activeId: propsActiveId, onChange: propsOnChange, tabs, ...rest } = tabsProps;
  const passTabsProps = {
    activeId: propsActiveId ?? activeId,
    onChange: propsOnChange ?? handleChange,
    tabs: tabs?.filter((tab) => !tab.hidden),
    ...rest,
  };

  // affix props 处理
  const { onPin, onUnpin, ...passAffixProps } = affixProps || {};
  const [pined, setPined] = React.useState(false);
  const handlePin = React.useCallback(() => {
    setPined(true);
    onPin && onPin();
  }, [onPin]);
  const handleUnPin = React.useCallback(() => {
    setPined(false);
    onUnpin && onUnpin();
  }, [onUnpin]);
  const pinCls = React.useMemo(() => {
    return pined ? pinClassName || '' : '';
  }, [pined, pinClassName]);

  // 渲染
  return (
    <Affix
      className={cn('rc__affix-tabs-nav__wrap', pinCls)}
      offsetTop={offset}
      {...passAffixProps}
      onPin={handlePin}
      onUnpin={handleUnPin}
    >
      <Tabs {...passTabsProps} />
    </Affix>
  );
}

AffixTabsNav.defaultProps = {
  affixProps: {},
};

export default AffixTabsNav;
