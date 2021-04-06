
const appHeight = (function () {
      setAppHeight = ()=>{
            const doc = document.documentElement
            doc.style.setProperty('--app-height', `${window.innerHeight}px`)
      }
      const init = ()=>{
            window.addEventListener('resize', appHeight)
            appHeight()
      }
      return {init}
})()

const pageController =  (function () {
      const elements = {
            container : $('.container'),
            card : $('.card'),
            cardContent : $('.card__content'),
            titleContainer : $('.title-container'),
            bgMain : $('.bg-main'),
            bgSub : $('.bg-sub'),
      }
      let pageIndex = 0
      let isMainBgShown = true
      let isImageChanging = false
      const answers = []
      const pages = [
            {
                  bgImage : "bg-1",
                  card: [
                        {tag:"div",className:'card__text',text:`Before we let you into the best cam sites with access to all our premium models, we have a few quick questions that will help us give you the best cams experience.`},
                        {tag:"div",className:'card__text--bold',text:"Click continue to begin."},
                        {tag:"button",className:"btn card__btn card__btn--sm", text:"CONTINUE"}
                  ]
            },
            {
                  bgImage : "bg-2",
                  card:[
                        {tag:"div",className:'card__text',text:`Have you ever watched a cam show with live cam models?`},
                        {tag:"button",className:"btn card__btn card__btn--sm", text:"YES"},
                        {tag:"button",className:"btn card__btn card__btn--sm", text:"NO"},
                  ],
            },
            {
                  bgImage : "bg-3",
                  card:[
                        {tag:"div",className:'card__text',text:`Is a large selection of online models important to you?`},
                        {tag:"button",className:"btn card__btn card__btn--sm", text:"YES"},
                        {tag:"button",className:"btn card__btn card__btn--sm", text:"NO"},
                  ],
            },
            {
                  bgImage : "bg-4",
                  card:[
                        {tag:"div",className:'card__text',text:`Do you prefer that your cam show is censored?`},
                        {tag:"button",className:"btn card__btn card__btn--sm", text:"YES"},
                        {tag:"button",className:"btn card__btn card__btn--sm", text:"NO"},
                  ],
            },
            {
                  bgImage : "bg-5",
                  card:[
                        {tag:"div",className:'card__text',text:`Would you rather watch on Mobile or Desktop?`},
                        {tag:"button",className:"btn card__btn card__btn--sm", text:"MOBILE"},
                        {tag:"button",className:"btn card__btn card__btn--sm", text:"DESKTOP"},
                  ],
            },
            {
                  bgImage : "bg-1",
                  card:[
                        {tag:"div",className:'card__title',text:`Congratulations!`},
                        {tag:"div",className:'card__text',text:`Click to access the world’s best Cam site.`},
                        {tag:"button",className:"btn card__btn card__btn--md", text:"ACCESS SITE"},
                  ],
            },
            {
                  bgImage : "bg-2",
                  card:[
                        {tag:"div",className:"card__text", text:`This website contains age-restricted materials.<br><br>You may enter if you are over the age of 18 years or over the age of majority in the location from where you are accessing this website.`},
                        {tag:"button",className:"btn card__btn card__btn--lg d-mobile-none", text:`I AM OVER 18 YEARS OLD`},
                        {tag:"button",className:"btn card__btn card__btn--md d-desktop-none", text:"ACCESS SITE"},
                        {tag:"a",href:"#",className:"card__link", text:"No, I am under 18 years old."},
                  ],
                  title : {tag:"div",className:"title",text:"AGE VERIFICATION"}
            }
      ]
      const setPage = (index)=>{
            function setCardUI(components) {
                 elements.cardContent.empty()
                 components.forEach(({tag,className,text,href}) => {
                        const el = $(`<${tag}/>`).addClass(className).html(text)
                        if(href) el.attr({href})
                        elements.cardContent.append(el)
                 });
            }
            function setTitle(title) {
                  if(!title) return
                  const {tag,className,text} = title
                  elements.titleContainer.empty()
                  elements.titleContainer.append( $(`<${tag}/>`).addClass(className).html(text))
            }
            function setBgImage(imageClass) {
                  const shownBG = isMainBgShown? elements.bgMain : elements.bgSub
                  const hiddenBG = isMainBgShown? elements.bgSub : elements.bgMain
                  const prevBg = shownBG[0].className.match(/bg-\d/gmi)[0]
                  shownBG.addClass('fade-out')
                  hiddenBG.addClass(['fade-in',imageClass]).removeClass('opacity-0')
                  isMainBgShown = !isMainBgShown
                  isImageChanging = true 
                  setTimeout(() => {
                        hiddenBG.removeClass(['fade-in','fade-out'])
                        shownBG.addClass('opacity-0').removeClass(['fade-in','fade-out',prevBg])
                        isImageChanging = false
                  }, 400);
            }
      
            const page = pages[index]
            setBgImage(page.bgImage)
            setCardUI(page.card)
            setTitle(page.title)
      }     
      const getAnswer = ()=>answers.slice()
      const init = ()=>{
            elements.container.on('click',e=>{
                  const target = $(e.target)
                  if(target.hasClass('card__btn') && !isImageChanging){
                        const isLastPage = pageIndex == 6
                        if(isLastPage){
                              alert(JSON.stringify(answers,undefined,2))
                        }else{
                              answers.push(target.text())
                              setPage(++pageIndex)
                        }
                  }
            })  
      }
      return {
            getAnswer,
            init
      }
})()

appHeight.init()
pageController.init()