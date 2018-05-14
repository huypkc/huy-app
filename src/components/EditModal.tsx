import * as React from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Modal, Radio } from 'react-bootstrap';
import Uploader from './Uploader';
const enum SRC_TYPE {
  URL = 'url',
  UPLOAD = 'upload'
}
class EditModal extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      srcType: SRC_TYPE.URL,
      tab: 1,
    };
  }

  public componentWillReceiveProps(nextProps: any) {
    this.setState({ item: nextProps.item });
  }

  public handleHide = () => {
    this.props.hideEditModal();
  }
  public editItem = () => {
    this.props.editItem(this.props.itemKey, this.state.item);
  }
  public handleChange = (e: any) => {
    this.setState({ item: { ...this.state.item, [e.currentTarget.id]: e.currentTarget.value } });
  }
  public handleChangeSrcType = (e: any) => {
    this.setState({ srcType: e.currentTarget.value });
  }
  public onUploadDone = (url: string) => {
    this.setState({ item: { ...this.state.item, src: url } });
  }
  public render() {
    return (
      this.state.item ? <div className="modal-container" style={{ height: 200 }}>
        <Modal
          show={this.props.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton={true}>
            <Modal.Title id="contained-modal-title">
              Edit Item
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="title"
              // validationState={this.getValidationState()}
              >
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.item.title}
                  placeholder="Title"
                  // id="title"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup
                controlId="desc"
              // validationState={this.getValidationState()}
              >
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.item.desc}
                  placeholder="Description"
                  // id="desc"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup
                controlId="src"
                className="Source"
              // validationState={this.getValidationState()}
              >
                <ControlLabel>Source</ControlLabel>
                <Radio name="radioGroup" inline={true} value={SRC_TYPE.URL} checked={this.state.srcType === SRC_TYPE.URL} onChange={this.handleChangeSrcType}>
                  Url
                    </Radio>{' '}
                <Radio name="radioGroup" inline={true} value={SRC_TYPE.UPLOAD} checked={this.state.srcType === SRC_TYPE.UPLOAD} onChange={this.handleChangeSrcType}>
                  Upload
                    </Radio>{' '}
              </FormGroup>
              {this.state.srcType === SRC_TYPE.UPLOAD ? <Uploader onUploadDone={this.onUploadDone} /> :
                <FormGroup controlId="src">
                  <FormControl type="text" value={this.state.item.src} placeholder="Url" onChange={this.handleChange} />
                </FormGroup>}
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Cancle</Button>
            <Button onClick={this.editItem}>OK</Button>
          </Modal.Footer>
        </Modal>
      </div> : null
    );
  }
}
export default EditModal;