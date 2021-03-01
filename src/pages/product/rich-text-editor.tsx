import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BASE_URL } from '../../utils/Constants';
import { ResponseValue } from '../../api/Model';
import { FileUploadResponseModel } from './Model';
import { myBlockRenderer } from './media';

interface State {
	editorState: EditorState;
}

interface Props {
	detail: string;
}

export default class RichTextEditor extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			editorState: this.initContent(),
		};
	}

 

	private initContent = (): any => {
		if (this.props.detail !== '') {
			const contentBlock = htmlToDraft(this.props.detail);
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			return editorState;
		}
		return EditorState.createEmpty();
	};

	private onEditorStateChange = (editorState: EditorState): void => {
		this.setState({
			editorState,
		});
	};

	private uploadImageCallBack = (file: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', BASE_URL + '/uploadFile');
			const data = new FormData();
			data.append('image', file);
			xhr.send(data);
			xhr.addEventListener('load', () => {
				const response: ResponseValue<FileUploadResponseModel> = JSON.parse(
					xhr.responseText
				) as ResponseValue<FileUploadResponseModel>;
				const url = response.data?.url ?? '';
				const name = response.data?.name ?? '';
				resolve({ data: { link: url + '/files/' + name } });
			});
			xhr.addEventListener('error', () => {
				const error = JSON.parse(xhr.responseText);
				reject(error);
			});
		});
	};

	public getDetail = (): string => {
		const { editorState } = this.state;
		return draftToHtml(convertToRaw(editorState.getCurrentContent()));
	};

	render() {
    const { editorState } = this.state;
    
		return (
			<div>
 				<Editor
					editorState={editorState}
					editorStyle={{ border: '1px solid black', minHeight: 200 }}
          onEditorStateChange={this.onEditorStateChange}
          customBlockRenderFunc={myBlockRenderer}
					toolbar={{
						inline: { inDropdown: true },
						list: { inDropdown: true },
						textAlign: { inDropdown: true },
						link: { inDropdown: true },
						history: { inDropdown: true },
						image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
					}}
				/>
			</div>
		);
	}
}
