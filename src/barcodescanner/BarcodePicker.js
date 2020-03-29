import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
configure("AYle+zbbKFSpLSlq5x6azSgdWADnI2dPa3kZrq0nLJ2MPC1GZzcX5WBQvFLIcKc473COucROGzwuddT7gEB3nQdj1PJwFoL3sSNqo0pGsY50WdYHY121g0psTxMvItpbfVGjEEN4+XlNEU0CdSGF56EBMddiTRvvUSYn5CS38KRcU/7qDaBAkzneWl+LA+VJ9/pvQ9TrjEv9RBmzcceA+UtNjUue91uWTTu2u012awK/YADlyPjv/WckI1P3VaYRCJzzCTTRiqHRsmsLOZBghMcudwgY7eWIM4LhZDs9NSKKhk4eZlaksLUkabx2swks9mln4qSNopNmlG4nBQkHDRHrXNGR0KOaDYDIb5Q2pIFe4kiAjQXsgjPkV6Jd9nOwKKV91GC8MGZyi7ASyJ9qMw8qMdFhH+8G2AYM9xbq1PUsqZQUa0nRgjWwGe6raP7SBWTroS7iNFhPVOwxDk0N7Nint7L2mifNchnmrkthrUbV492pYyFhqz7nXW3TgFh0wcH8RUV3KSdBJcIbub9IL2wAV8sK0ejVkEBLaAlIc8QnhptxCugNFcc2xbNWojteXSuiICv4EqZqbfFPksZTjfLTU1Rg7MubjhWjFIyvFTkLDTLXqZ9tVxduaQtn7v/HK1Bc21/PBNp/AiKL5XTR7g2eubMJbBXDeaAPeDqN6K22QJNbnlH8NvRyn7LWltpqUDuvCNZzsH10AsRe05Uae3YgXm1MRlgcNzl1B71NJOOALxFveVKvwPl12VVcL/gDkdIUjbOd5iHznoedS2VEZyYT5lp6BOEbM3EEZOM+BiOh7ilfR/9IacpC7NOgc4+Zzbat", { engineLocation: "https://unpkg.com/scandit-sdk" }).catch(error => {
  alert(error);
});

const style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%"
};

class BarcodePicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    ScanditSDKBarcodePicker.create(this.ref.current, this.props).then(barcodePicker => {
      this.barcodePicker = barcodePicker;
      if (this.props.onScan != null) {
        barcodePicker.on("scan", this.props.onScan);
      }
      if (this.props.onError != null) {
        barcodePicker.on("scanError", this.props.onError);
      }
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}

export default BarcodePicker;
