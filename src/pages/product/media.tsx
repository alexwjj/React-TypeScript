import React, { Component } from 'react';

interface Props {
	contentState: any;
	block: any;
	blockProps: any;
}

interface Sate {}

export const myBlockRenderer = (contentBlock: any): any => {
	const type = contentBlock.getType();

	// 图片类型转换为mediaComponent
	if (type === 'atomic') {
		return {
			component: Media,
			editable: false,
			props: {
				foo: 'bar',
			},
		};
	}
};

class Media extends Component<Props, Sate> {
	render() {
		const { block, contentState } = this.props;
		const data = contentState.getEntity(block.getEntityAt(0)).getData();
		const emptyHtml = ' ';
		return (
			<div>
				{emptyHtml}
				<img
					src={data.src}
					alt={data.alt || ''}
					style={{ height: data.height || 'auto', width: data.width || 'auto' }}
				/>
			</div>
		);
	}
}
