import * as sodium from 'sodium-native'
import sodiumUniversal from 'sodium-universal'

sodium.crypto_generichash = sodiumUniversal.crypto_generichash

export { sodium }
