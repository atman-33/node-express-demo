"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const downloadButton = document.getElementById('download-button');
if (downloadButton) {
    downloadButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('download-button clicked');
        const response = yield fetch('api/download-apk');
        const blob = yield response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'fake-apk.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }));
}
