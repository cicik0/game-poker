
const win = window as any;

export const languages = {
	defaultText: 'Text content',
	confirm: 'Confirm',
	cancel: 'Cancel',
};

if (!win.languages) {
    win.languages = {};
}

win.languages.en = languages;
