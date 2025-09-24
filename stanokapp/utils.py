from googletrans import Translator

translator = Translator()

def translate_text_all(text, src='uz'):
    translations = {}
    for lang in ['en', 'ru']:
        result = translator.translate(text, src=src, dest=lang)
        translations[lang] = result.text
    return translations
