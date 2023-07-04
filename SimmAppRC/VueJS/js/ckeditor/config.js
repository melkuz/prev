/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.toolbar = [

			{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
			{ name: 'insert', items: [  'Smiley', 'SpecialChar', 'base64image' ] },
			{ name: 'links', items: ['Link','Unlink'] },
			{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },

		];
	config.extraPlugins = 'autogrow,base64image';

};

