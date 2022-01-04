import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";

// https://github.com/lazarnikolov94/egghead-getting-started-with-chakra-ui/blob/lesson-7/src/theme/index.ts

const colors = {
  p1_Orange : {
    50: '#ffe7df',
    100: '#ffc0b1',
    200: '#ff977f',
    300: '#ff6f4d',
    400: '#fe471b',
    500: '#e52d02',
    600: '#b32300',
    700: '#811800',
    800: '#4f0c00',
    900: '#200100',
  },
  p2_Blue : {
    50: '#e0efff',
    100: '#b0ceff',
    200: '#80adff',
    300: '#4e8cfd',
    400: '#1d6cfb',
    500: '#0452e2',
    600: '#0040b0',
    700: '#002e7f',
    800: '#001b4f',
    900: '#000920',
  },
  p3_Yellow : {
    50: '#fffbda',
    100: '#fff2ad',
    200: '#ffe97d',
    300: '#ffe14b',
    400: '#ffd81a',
    500: '#e6be00',
    600: '#b39400',
    700: '#806a00',
    800: '#4d3f00',
    900: '#1c1500',
  },
  p4_Purple :{
    50: '#ffe8ff',
    100: '#efc0f3',
    200: '#e198e7',
    300: '#d470dc',
    400: '#c748d1',
    500: '#ad2eb7',
    600: '#88238f',
    700: '#611867',
    800: '#3c0c3f',
    900: '#180219',
  },
  gray: {
    50: '#f2f2f8',
    100: '#d7d7db',
    200: '#bbbbc1',
    300: '#a1a1a7',
    400: '#86868e',
    500: '#6c6c76',
    600: '#54545b',
    700: '#242429',
    800: '#18181B',
    900: '#0c0c13',
  },
}

const theme = extendTheme(
  {
    colors,
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    components : {
      Button: {
        baseStyle: {
          borderRadius: 0, 
        },
      }
    },
    fonts: {
      heading: `Montserrat, ${base.fonts?.heading}`,
      body: `Inter, ${base.fonts?.body}`,
    },
  },
  {
    styles: {
      global: {
        body: {
          bg: "gray.800",
        },
        // a: {
        //   color: "teal.500",
        //   _hover: {
        //     textDecoration: "underline",
        //   },
        // },
      },
    },
  },
  withDefaultColorScheme({
    // colorScheme: 'brand',
    components: ["Checkbox"],
  })
);

export default theme;
