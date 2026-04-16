const { withTamagui } = require("@tamagui/next-plugin")
const path = require('path')
const stubPath = path.resolve(__dirname, 'stub.js')

/**
 * @type {import('next').NextConfig}
 */
const WithTamagui = {
  config: "../../packages/ui/src/tamagui.config.ts",
  components: ["tamagui", "@app/ui"],
  outputCSS: process.env.NODE_ENV === "production" ? './public/tamagui.css' : "null"
}
/**
 * @type {import('next').NextConfig}
 */
const withWebpack = {
  webpack(config) {
    if (!config.resolve) {
      config.resolve = {}
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': 'react-native-web',
      'react-native$': 'react-native-web',
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
    }

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...(config.resolve?.extensions ?? []),
    ]

    return config
  },
}

/**
 * @type {import('next').NextConfig}
 */
const withTurpopack = {
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      // Маскируем мобильные части react-native-svg
      'react-native/Libraries/Utilities/codegenNativeComponent$': stubPath,
      'react-native/Libraries/Utilities/codegenNativeComponent': stubPath,
      'react-native/Libraries/TurboModule/TurboModuleRegistry$': stubPath,
      'react-native/Libraries/TurboModule/TurboModuleRegistry': stubPath,
      'react-native/Libraries/Image/AssetRegistry$': 'react-native-web/dist/modules/AssetRegistry/index.js',

      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
    },
    resolveExtensions: [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',

      '.js',
      '.mjs',
      '.tsx',
      '.ts',
      '.jsx',
      '.json',
      '.wasm',
    ],
    root: path.resolve(__dirname, '../..'),
  },
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'react-native-reanimated',
    'moti',
    'react-native-gesture-handler',
    "@app/ui",
    'react-native-worklets-core'
  ],

  compiler: {
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    },
  },
  reactStrictMode: false, // reanimated doesn't support this on web

  ...withWebpack,
  ...withTurpopack,
}
module.exports = withTamagui(WithTamagui)(nextConfig)