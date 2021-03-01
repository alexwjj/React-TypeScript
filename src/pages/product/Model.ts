/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-11-03 22:59:39
 * @LastEditors: MFine
 * @LastEditTime: 2020-12-29 23:42:19
 */
	export interface ProductsModel {
		id?: number;
		images: string;
		status: number;
		idStr?: string;
		name: string;
		desc: string;
		detail: string;
		categoryId: string;
		pcategoryId: string;
		price: string;
		v: number;
	}

  export interface FileUploadResponseModel {
    url: string;
    name: string;
  }
  
	export interface StringValidator {
		isAcceptable(s: string): boolean;
	}
