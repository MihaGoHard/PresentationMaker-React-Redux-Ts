import React from 'react'
import './HeaderPanel.css'
import { Commands, MenuItem } from '../Commands/Commands'
import  Tools  from '../Tools/Tools'
import { createDefaultProgramm, getMainProg, changePresentationTitle, setPlayerState } from '../../Models/ActionCreators/commonActionCreators'
import { savePresentationAsJSON, loadPresentation, saveProgramAsPDF, openProgramAsPDF } from '../../Models/CommonFunctions/setGetPresentation'
import { connect } from 'react-redux'
import { MainProg, Programm, Slide } from '../../Models/types'
import { addSlide, setSelectedSlides } from '../../Models/ActionCreators/slideActionCreators'


interface HeaderPanelProps {
  slides: Array<Slide>
  addSlide: () => void, title: string, 
  getMainProg: (prog: MainProg) => void,
  createDefaultProgramm: () => void,
  changePresentationTitle: (newTitle: string) => void,
  setPlayerState: (playerState: 'open' | 'close') => void,
  setSelectedSlides: (selectedSlides: Array<string>) => void
}


function HeaderPanel(props: HeaderPanelProps) {
  const menu: Array<MenuItem> = [
    {title: "Новая презентация", onClick: () => props.createDefaultProgramm()},
    {title: "Открыть", onClick: () => loadPresentation(props.getMainProg)},
    {title: "Сохранить", onClick: () => savePresentationAsJSON()},
    {title: "Предпросмотр", onClick: () => openProgramAsPDF()}, 
    {title: "Экспорт в PDF", onClick: () => saveProgramAsPDF()}, 
    {title: "Демонстрация", onClick: () => {
      let elem = document.querySelector(".mainSlideDiv")
      elem?.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
      })
      props.setPlayerState('open')
      props.setSelectedSlides([props.slides[0].id])
    }}
  ]

  return (
    <div className="header-panel">
      <input type="text" className="title" defaultValue={props.title} 
        onKeyPress= {
          (e) => {if (e.key === "Enter") {
            e.currentTarget.value = (e.currentTarget.value == '') ? 'Презентация без названия' : e.currentTarget.value
            props.changePresentationTitle(e.currentTarget.value)
            e.currentTarget.blur()
            }}
        } 
      />
      <Commands menu={menu} />
      <Tools />
    </div>
  )
}

const mapDispatchToProps = {
    addSlide,
    getMainProg,
    createDefaultProgramm,
    changePresentationTitle,
    setPlayerState,
    setSelectedSlides
}

const mapStateToProps = (state: Programm) => ({
  title: state.mainProg.currentPresentation.title,
  slides: state.mainProg.currentPresentation.slides 
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPanel)