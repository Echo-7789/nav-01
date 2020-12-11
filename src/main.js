const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x) 
const hashMap = xObject || [
    {logo:'B',url:'https://www.bilibili.com'},
    {logo:'I',url:'https://www.iqiyi.com'},
]
const simplifyUrl = (url) =>{
    return url.replace('https://','')
              .replace('http://','')
              .replace('www.','')
              .replace(/\/.*/, '')
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) =>{
        const $li = $(`<li>
            <div class='site'>
                <div class='logo'>${node.logo}</div>
                <div class='link'>${simplifyUrl(node.url)}</div>
                <div class='close'>
                    <svg class="icon" >
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi) 
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
    })
}
render()
$('.addButton')
  .on('click',()=>{
      let url = window.prompt('请问你要监听的网址是啥')
      if(url.indexOf('http')!==0){
          url = 'https://'+url;
      }
      console.log(url)

      hashMap.push({
          logo:simplifyUrl(url)[0].toUpperCase(),
          url:url
      })

    render()
  });

window.onbeforeunload = ()=>{
      const string = JSON.stringify(hashMap)
      localStorage.setItem('x',string)
}
$(document).on('keyPress',(e)=>{
    const {key}=e //const key = e.key
    for(let i = 0;i<hashMap.length;i++){
        if(hashMap.logo.toLowCase===key){
            window.open(hashMap[i].url)
        }
    }
})