import * as React from 'react';
import { Button, Pagination, Table } from 'react-bootstrap';
import { connect, Dispatch } from 'react-redux';
import { addItem, fetchList, ADDED_ITEM, removeItem, editItem, EDITED_ITEM } from '../core/actions/ListAction';
import AddModal from './AddModal';
import './Page.css';
import PreviewModal from './PreviewModal';
import { downloadUrl, downloadCSV, formatDate, getMediaType, MEDIA_TYPE } from '../core/util';
import EditModal from './EditModal';

class Page extends React.Component<{items: any, dispatch: Dispatch<any>, isShowAddModal: boolean, isShowEditModal: boolean}, any> {
  constructor(props: any) {
    super(props);
    this.state = { isShowAddModal: false, page: 1, isShowPreviewModal: false, isShowEditModal: false };
  }
​
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchList());
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.isShowAddModal !== this.state.isShowAddModal) {
      this.setState({isShowAddModal: nextProps.isShowAddModal});
    }
    if (nextProps.isShowEditModal !== this.state.isShowEditModal) {
      this.setState({isShowEditModal: nextProps.isShowEditModal});
    }
  }

  public showAddModal = () => {
    this.setState({isShowAddModal: true});
  }
  public hideAddModal = () => {
    this.setState({isShowAddModal: false})
  }

  public showEditModal = (key: string, item: any) => {
    this.setState({isShowEditModal: true, selectedItem: item, selectedItemKey: key});
  }
  public hideEditModal = () => {
    this.setState({isShowEditModal: false})
  }

  public addItem = (item: any) => {
    const { dispatch } = this.props;
    dispatch(addItem(item));
  }

  public editItem = (key: string, item: any) => {
    const { dispatch } = this.props;
    dispatch(editItem(key, item));
  }
  
  public goToPage = (e: any) => {
    this.setState({page: Number(e.currentTarget.text)});
  }

  public previewMedia(src: string) {
    this.setState({isShowPreviewModal: true, previewSrc: src});
  }
  public hidePreviewMedia = () => {
    this.setState({isShowPreviewModal: false});
  }
  public formatPreview = (src: string) => {
    const type = getMediaType(src);
    switch (type) {
      case MEDIA_TYPE.IMG: return <a onClick={() => this.previewMedia(src)}>[IMAGE]</a>;
      case MEDIA_TYPE.VIDEO: return <a onClick={() => this.previewMedia(src)}>[VIDEO]</a>;
      default: return null;
    }
  }
  public formatDownload = (src: string ) => {
    return src.length? <a onClick={() => downloadUrl(src)}>Download</a>: null;
  }
  public exportCsv = () => {
    const items = Object.keys(this.props.items).map((key) => {
      return this.props.items[key];
    })
    return downloadCSV(items);
  }
  public deleteItem(key: string, item: any) {
    this.props.dispatch(removeItem(key));
  }
  public render() {
    const perPage = 5;
    const listIds = this.props.items? Object.keys(this.props.items): [];
    const pages = [];
    let items = [];
    for (let i = 1; i <= Math.ceil(listIds.length/perPage); i++) {
      pages.push(
        <Pagination.Item key={i} active={i === this.state.page} onClick={this.goToPage}>{i}</Pagination.Item>
      );
    }
    items = this.props.items && Object.keys(this.props.items).slice((this.state.page-1)*perPage, (this.state.page-1)*perPage + perPage).map((key: string) => {
      const item = this.props.items[key];
      return (<tr key={key} className="row">
        <td className="col-sm-2">{item.title}</td>
        <td className="col-sm-2">{item.desc}</td>
        <td className="col-sm-2 RowCenter">{formatDate(item.created)}</td>
        <td className="col-sm-2 RowCenter">{this.formatPreview(item.src)}</td>
        <td className="col-sm-2 RowCenter">{this.formatDownload(item.src)}</td>
        <td className="col-sm-2 RowCenter RowActions"><a className="EditItem" onClick={() => this.showEditModal(key, item)}>Edit</a> <a onClick={() => this.deleteItem(key, item)}>Delete</a></td>
      </tr>);
    });
    return (
      <div className="container MainPage">
        <div className="MainActions">
          <Button className="Add" bsStyle="success" onClick={this.showAddModal}>Add</Button>
          <Button className="Export" bsStyle="primary" onClick={this.exportCsv}>Export</Button>
        </div>
        <Table striped={true} bordered={true} condensed={true} className="TableWrapper">
          <thead>
            <tr className="row">
              <th className="col-sm-2">Title</th>
              <th className="col-sm-2">Description</th>
              <th className="col-sm-2">Date created</th>
              <th className="col-sm-2">Preview</th>
              <th className="col-sm-2">Download</th>
              <th className="col-sm-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </Table>
        <div className="Paging"><Pagination bsSize="medium">{pages}</Pagination></div>
        <AddModal show={this.state.isShowAddModal} hideAddModal={this.hideAddModal} addItem={this.addItem}/>
        <EditModal show={this.state.isShowEditModal} itemKey={this.state.selectedItemKey} item={this.state.selectedItem} hideEditModal={this.hideEditModal} editItem={this.editItem}/>
        <PreviewModal show={this.state.isShowPreviewModal} hidePreviewModal={this.hidePreviewMedia} previewSrc={this.state.previewSrc}/>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isShowAddModal: state.ListReducer.type === ADDED_ITEM,
    isShowEditModal: state.ListReducer.type === EDITED_ITEM,
    items: state.ListReducer.list,
  };
};

export default connect(mapStateToProps)(Page);
