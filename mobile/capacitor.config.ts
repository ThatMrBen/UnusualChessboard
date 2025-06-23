import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.unusualchessboard.app',
  appName: 'UnusualChessboard',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    hostname: 'unusualchessboard.com',
    iosScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: true,
      spinnerColor: '#673AB7',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
    },
  },
  android: {
    buildOptions: {
      keystorePath: 'release.keystore',
      keystoreAlias: 'unusualchessboard',
    },
  },
  ios: {
    contentInset: 'always',
  },
};

export default config; 