import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: 'https://www.moddevices.com/hubfs/assets/billboards/home-billboard.jpg?t=1541427380933',
    }
  }

  render() {
    return (
      <div className="body-container-wrapper">
        <div className="body-container container-fluid">

          <div className="row-fluid-wrapper row-depth-1 row-number-1 ">
            <div className="row-fluid ">
              <div className="span12 widget-span widget-type-cell " style={{}} data-widget-type="cell" data-x="0" data-w="12">

                <div className="row-fluid-wrapper row-depth-1 row-number-2 ">
                  <div className="row-fluid ">
                    <div className="span12 widget-span widget-type-widget_container flex-top-full" style={{}} data-widget-type="widget_container" data-x="0" data-w="12">
                      <span id="hs_cos_wrapper_module_14508921441232089" className="hs_cos_wrapper hs_cos_wrapper_widget_container hs_cos_wrapper_type_widget_container" style={{}} data-hs-cos-general-type="widget_container" data-hs-cos-type="widget_container"><div id="hs_cos_wrapper_widget_1521048535522" className="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_custom_widget" style={{}} data-hs-cos-general-type="widget" data-hs-cos-type="custom_widget"><div className="billboard billboard--medium has-bg-photo">
                        <div style={{ background_image: this.state.url }} className="billboard__underlay"></div>
                        <div className="billboard__overlay billboard__overlay--medium"></div>

                        <div className="billboard__inner constrain">
                          <div className="billboard__content">
                            <div className="billboard__content__inner">
                              <h1>For all purposes, an entire sonic universe inside</h1>
                              <p className="large">Get access to more than five hundred audio and MIDI plugins in a collection that will never stop growing</p>
                            </div>
                          </div>
                        </div>

                      </div>
                      </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="muff">
        <span class="gear-gallery__photo"><img src="https://www.moddevices.com/hubfs/assets/images/images/gear-gallery/big-muff-600x450.png?t=1541427380933" alt="Big Muff"></img></span>
        <span class="gear-gallery__photo"><img src="https://www.moddevices.com/hubfs/assets/images/images/gear-gallery/GxTubeScreamer-600x450.png?t=1541427380933" alt="Big Muff"></img></span>
        <span class="gear-gallery__photo"><img src="https://www.moddevices.com/hubfs/assets/images/images/gear-gallery/big-muff-600x450.png?t=1541427380933" alt="Big Muff"></img></span>
        <span class="gear-gallery__photo"><img src="https://www.moddevices.com/hubfs/assets/images/images/gear-gallery/big-muff-600x450.png?t=1541427380933" alt="Big Muff"></img></span>

      </div>
      </div>
      

    );
  }
}

export default App;
