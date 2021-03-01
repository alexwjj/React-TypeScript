import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { BASE_IMAGES_URL, BASE_URL } from '../../utils/Constants';
import { ResponseValue } from '../../api/Model';
import { nanoid } from 'nanoid';
import { reqDeleteProductsImages } from '../../api';
import { FileUploadResponseModel } from './Model';

function getBase64(file: any): Promise<any> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}


interface PicturesWallState {
	previewVisible: boolean;
	previewImage?: string;
	previewTitle?: string;
	fileList: UploadFile<any>[];
}

interface PicturesWallProps {
	images: string;
}

export default class PicturesWall extends Component<PicturesWallProps, PicturesWallState> {
	constructor(props: PicturesWallProps) {
		super(props);
		this.state = {
			previewVisible: false,
			previewImage: '',
			previewTitle: '',
			fileList: [],
		};
	}

	private initPreviewImages = (): void => {
		const fileList: UploadFile<any>[] = [];
		if (this.props.images === '') {
			return;
		}
		this.props.images.split(',').forEach((item: string) => {
			fileList.push({
				uid: nanoid(),
				url: BASE_IMAGES_URL + item,
				name: item,
				size: 0,
				type: 'image/webp',
				status: 'done',
			});
		});

		this.setState({
			fileList,
		});
	};

	private handleCancel = () => this.setState({ previewVisible: false });

	private handlePreview = async (file: UploadFile<any>) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url?.substring(file.url.lastIndexOf('/') + 1),
		});
	};


	private handleChange = async ({ file, fileList, event }: UploadChangeParam) => {
		if (file.status === 'done') {
			const result: ResponseValue<FileUploadResponseModel> = file.response as ResponseValue<FileUploadResponseModel>;
			if (result.status === 0 && result.data) {
				message.success('上传图片成功');
				let currentIndex = fileList.length - 1;
				fileList[currentIndex].name = result.data?.name;
				fileList[currentIndex].url = BASE_IMAGES_URL + result.data?.name;
			} else {
				message.error('上传失败');
			}
		} else if (file.status === 'removed') {
			const result: ResponseValue<number> = await reqDeleteProductsImages(file.name ?? '');
			if (result.status === 0) {
				message.success(file.fileName + '已经成功删除');
			} else {
				message.error('删除图片失败');
			}
		}
		this.setState({
			fileList,
		});
	};

	public getImages = (): string[] => {
		return this.state.fileList.map((file) => file.name ?? '');
	};

	componentDidMount() {
		this.initPreviewImages();
	}

	render() {
		const { previewVisible, previewImage, fileList, previewTitle } = this.state;
		const uploadButton = (
			<div>
				<PlusOutlined />
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		);
		return (
			<div>
				<Upload
					action={BASE_URL + '/uploadFile'}
					accept="image/*"
          listType="picture-card"
					name="image"
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
					multiple
				>
					{fileList.length >= 3 ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</div>
		);
	}
}
