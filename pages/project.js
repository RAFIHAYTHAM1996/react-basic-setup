import React, { Component, Fragment } from "react";
import { TweenMax, TimelineMax, EasePack, TextPlugin} from 'gsap';
import Head from "next/head";
import Page from "../layouts/main";
import ReactGA from 'react-ga';
import settings from "../util/settings";
import data from '../util/data.json';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: undefined,
      preloadedImages: false
    }
    this.ASSET_PATH = settings.ASSET_PATH + "images/"
  }

  componentWillMount() {
    this.validateRoute();
  }

  componentDidMount() {
    if (!this.state.preloadedImages) {
      const img = new Image();
      img.src = this.ASSET_PATH + this.state.project.images[0];
      img.onload = ()=>{
        TweenMax.set(this.ProjImage, {backgroundImage: `url(${img.src})`})
        this.setState({preloadedImages: true})
      }
    }
  }

  validateRoute = () => {
    var router = this.context.router,
        state = {}
    if (!settings.isServer()) {
      var urlChops = window.location.pathname.split("/"),
          lastChop = "", validURL = false
      for (var i = urlChops.length - 1; i > 0; i--) {
        if (urlChops[i] && urlChops[i] != "") {
          lastChop = urlChops[i]
          break
        }
      }
      for (var i = 0; i < data.projects.length; i++) {
        if (data.projects[i].url == lastChop) {
          state.project = data.projects[i]
          validURL = true
        }
      }
      if (!validURL) router.push("/")
      this.setState(state)
    }
  }

  getInfo = (specific) => {
    var result = this.state.project.info,
        info = this.state.project.info;
    if (specific) {
      for (var i in info) {
        if (info[i].title == specific) {
          result = info[i].content
          break
        }
      }
    }
    return result;
  }

  componentWillUnmount() {
  }

  render() {
    const { project } = this.state
    return (
      <Page id="Project" menu={{solidStyle: true}} ref={el => this.Page = el}>
        { project &&
          <div className="row" style={{margin: 0}}>
            <div className="col-md-6 proj-img-container" ref={el => this.ProjImage = el} />
            <div className="col-md-6">
              <div className="ContentContainer">
                <h1 className="proj-name">{this.getInfo("name")}</h1>
                { project.info.map((item, index) => {
                    if (item.title != "name") {
                      return (
                        <Fragment>
                          <h2>{item.title}</h2>
                          <h5>{item.content}</h5>
                        </Fragment>
                      )
                    }
                })}
              </div>
            </div>
          </div>
        }
      </Page>
    )
  }
}

export default Project
