import { jsonInstance } from './api/jsonInstance';

export const getDataFromJson = (url) => jsonInstance.get(url);

export const setDataToJson = (url, data) => jsonInstance.post(url, data);

export const editDataInJson = (url, data) => jsonInstance.put(url, data);
