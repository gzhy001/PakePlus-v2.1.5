window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug


//下载网络链接文件到本地，支持多文件下载，以及下载进度回调
//https://www.pakeplus.com/zh/guide/desktopapi.html

//在脚本中添加以下代码，即可实现打开 URL(默认浏览器)
const { invoke } = window.__TAURI__.core

//在脚本中添加以下代码，即可实现打开 URL(新窗口)
//const { WebviewWindow } = window.__TAURI__.webviewWindow

const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open_url_v2', url, target, features)
    //location.href = url //本窗口下载
    invoke('open_url', { url: url }) //默认浏览器下载  
}

document.addEventListener('click', hookClick, { capture: true })

