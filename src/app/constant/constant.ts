import { SourceTypeElement } from '../models/source-type/source-type-element';

class AppSettings {
    baseApiUrl: string = '';
    appVersion: string = '';
}

export const APP_SETTINGS = new AppSettings();
export let INITIAL_SOURCE_TYPE_ELEMENT: SourceTypeElement = {
    position: 0,
    sourceTypeId: null,
    sourceTypeName: null,
    sourceTypeDescription: null,
};
