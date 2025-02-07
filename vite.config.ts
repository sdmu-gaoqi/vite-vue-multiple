import { default as vue } from '@vitejs/plugin-vue'
import { default as vueJsx } from '@vitejs/plugin-vue-jsx'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import type { ConfigEnv, UserConfigExport } from 'vite'
import { defineConfig } from 'vite'
import { default as mkcert } from 'vite-plugin-mkcert'
import postCssPxToRem from 'wa-postcss-pxtorem'
import tailwindCss from 'tailwindcss'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pages: string[] = []

function getEntryPath() {
  const map: any = {} //最后生成的多页面配置项
  const PAGE_PATH = path.resolve(__dirname, './src/project') //指定要查询的目录
  const entryFiles = pages.length === 0 ? fs.readdirSync(PAGE_PATH) : pages //获取到指定目录下的所有文件名或指定文件名
  entryFiles.forEach((filePath) => {
    //遍历处理每个子页面的入口
    map[filePath] = path.resolve(
      __dirname,
      `src/project/${filePath}/index.html`
    )
  })
  return map
}

const entryMap = getEntryPath()

// https://vitejs.dev/config/
export default defineConfig(
  // @ts-ignore
  ({ command }: ConfigEnv): UserConfigExport => {
    return {
      base: '',
      root: './src/project',
      plugins: [
        vue(),
        vueJsx(),
        mkcert(),
        viteMockServe({
          mockPath: 'mock',
          injectFile:
            command === 'serve'
              ? path.resolve(process.cwd(), 'mock/test/*.ts')
              : path.resolve(process.cwd(), 'mock/prod/*.ts'),
          localEnabled: command === 'serve',
          prodEnabled: true
        }),
        AutoImport({
          // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
          imports: ['vue'],
          dts: path.resolve(__dirname, 'src/types/auto-import.d.ts'),
          eslintrc: {
            enabled: false, // 是否自动生成 eslint 规则，建议生成之后设置 false
            filepath: path.resolve(__dirname, './.eslintrc-auto-import.json'), // 指定自动导入函数 eslint 规则的文件
            globalsPropValue: true
          }
        })
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@project': path.join(__dirname, './src/project'),
          mock: path.join(__dirname, './mock')
        }
      },
      server: {
        https: false,
        port: 3000
      },
      css: {
        postcss: {
          plugins: [
            postCssPxToRem({
              rootValue: 32,
              propList: ['*'],
              selectorBlackList: ['./to', 'html'], // to开头的不进行转换,
              exclude: '/node_modules',
              unit: 'wx'
            }),
            tailwindCss()
          ]
        },
        preprocessorOptions: {
          scss: {
            additionalData: '@use "./src/styles/main.scss";',
            api: 'modern-compiler' // or 'modern'
          }
        }
      },
      build: {
        rollupOptions: {
          input: entryMap,
          external: ['vscode', 'fs', 'path'],
          output: {
            // format: "es",
            chunkFileNames: 'js/[name]-[hash].js', //chunk包输出的文件夹名
            entryFileNames: (chunkInfo) => {
              if (chunkInfo.name === 'extension') {
                return '[name].js'
              }

              return 'js/[name]-[hash].js'
            }, //入口文件输出的文件夹名称
            assetFileNames(assetInfo) {
              const name = assetInfo?.names?.[0]?.split('.')?.at(-1) || ''
              if (
                ['png', 'jpg', 'jpeg', 'svg', 'ico', 'webp'].some((item) =>
                  name.endsWith(item)
                )
              ) {
                return 'assets/img/[name]-[hash].[ext]'
              }

              return '[ext]/[name]-[hash].[ext]'
            }
          }
        },
        outDir: path.resolve(__dirname, `dist`) // 指定输出路径
      },
      envDir: 'env' // 注册进vite的参数
    }
  }
)
