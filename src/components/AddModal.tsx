import * as React from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Modal, Tabs, Tab, Radio } from 'react-bootstrap';
import Uploader from './Uploader';
import NasaSearch from './NasaSearch';
const enum SRC_TYPE {
  URL = 'url',
  UPLOAD = 'upload'
}
class AddModal extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      item: {
        desc: '',
        title: '',
        src: ''
      },
      srcType: SRC_TYPE.UPLOAD,
      tab: 1,
    };
  }

  public handleHide = () => {
    this.props.hideAddModal();
  }
  public addItem = () => {
    this.props.addItem(this.state.item);
  }
  public handleChange = (e: any) => {
    this.setState({ item: { ...this.state.item, [e.currentTarget.id]: e.currentTarget.value } });
  }
  public handleSelect = (tab: any) => {
    this.setState({ tab });
  }
  public handleChangeSrcType = (e: any) => {
    this.setState({srcType: e.currentTarget.value});
  }
  public selectItem = (item: any) => {
    const data = {
      title: item.data[0].title,
      desc: item.data[0].description,
      src: item.links[0].href
    }
    this.setState({item: data});
  }
  public onUploadDone = (url: string) => {
    this.setState({ item: { ...this.state.item, src: url } });
  }
  public render() {
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
              Add Item
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs activeKey={this.state.tab}
              onSelect={this.handleSelect}
              id="controlled-tab-example">
              <Tab eventKey={1} title="Manual">
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
                    <Radio name="radioGroup" inline={true} value={SRC_TYPE.UPLOAD} checked={this.state.srcType === SRC_TYPE.UPLOAD} onChange={this.handleChangeSrcType}>
                      Upload
                    </Radio>{' '}
                    <Radio name="radioGroup" inline={true} value={SRC_TYPE.URL} checked={this.state.srcType === SRC_TYPE.URL} onChange={this.handleChangeSrcType}>
                      Url
                    </Radio>{' '}
                  </FormGroup>
                  {this.state.srcType === SRC_TYPE.UPLOAD ? <Uploader onUploadDone={this.onUploadDone}/> :
                    <FormGroup controlId="src">
                      <FormControl type="text" placeholder="Url" onChange={this.handleChange}/>
                    </FormGroup>}
                </form>
              </Tab>
              <Tab eventKey={2} title="NASA">
                <NasaSearch selectItem={this.selectItem}/>
              </Tab>
            </Tabs>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Cancle</Button>
            <Button onClick={this.addItem}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default AddModal;