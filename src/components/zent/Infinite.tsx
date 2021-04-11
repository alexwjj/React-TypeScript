import { InfiniteScroller, Card } from 'zent';
import * as React from 'react';
export default class JInfinite extends React.Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  loadMore(closeLoading) {
    const { list } = this.state;
    const latestList = list.slice(list.length - 10);
    const newList = latestList.map(item => item + 10);

    setTimeout(() => {
      this.setState({
        list: [...list, ...newList],
      });
      closeLoading && closeLoading();
    }, 500);
  }

  render() {
    const { list } = this.state;
    return (
      <InfiniteScroller
        className="infinite-scroller-demo"
        hasMore
        loadMore={this.loadMore.bind(this)}
      >
        {list.map(item => (
          <Card key={item}>{item}</Card>
        ))}
      </InfiniteScroller>
    );
  }
}