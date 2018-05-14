import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getMediaType, MEDIA_TYPE } from '../core/util';

class PreviewModal extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);

  }

  public handleHide = () => {
    this.props.hidePreviewModal();
  }

  public render() {
    const type = getMediaType(this.props.previewSrc);
    return (
      <div className="modal-container" style={{ height: 200 }}>
        <Modal
          show={this.props.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton={true}>
            <Modal.Title id="contained-modal-title">
              Preview
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {type === MEDIA_TYPE.IMG &&
              <div><img width='100%' className="img" src={this.props.previewSrc} /></div>}
            {type === MEDIA_TYPE.VIDEO &&
              <div>
                <video width="100%" autoPlay={true} controls={true}>
                  <source src={this.props.previewSrc} type="video/mp4" />
                  <source src={this.props.previewSrc} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              </div>}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>OK</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default PreviewModal;