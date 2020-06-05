import message from '../src/js/message'
import Translate from 'nyc-lib/nyc/lang/Translate'

const ccLanguages = ['en', 'ar', 'bn', 'zh', 'fr', 'ht', 'ko', 'po', 'ru', 'es', 'ur']

test('messages from defaults w/o Hebrew', () => {
  expect.assertions(11)

  ccLanguages.forEach(lang => {
    expect(message.languages[lang]).toEqual(Translate.DEFAULT_LANGUAGES[lang])
  })
})