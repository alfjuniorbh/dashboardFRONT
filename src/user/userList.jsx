import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './userActions'
import NoResult from '../common/template/noResult';
import LoadingPage from '../common/loading/loading';
import TableHead from '../common/datatable/tableHead';

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
            wating: true
		};
	}
	componentDidMount() {
		this.props.getList()
		.then((res) =>{
            this.setState({ wating: false });
        });
    }
    
    renderRows() {
        const list = this.props.list || []
        if (list.status == false) {
			return <NoResult colSpan='6' msg='No results'/>
		} else {
           return list.map(res => (
               <tr key={res.id}>
                   <td className='text-center'>{res.id}</td>
                   <td>{res.name}</td>
                   <td>{res.email}</td>
                   <td>{res.status == 1 ? 'Active' : 'No active'}</td>
                   <td>{res.created_at}</td>
                   <td className='text-center'>
                     <div className='btn-group'>
                       <button className='btn btn-xs btn-flat btn-warning' onClick={() => this.props.showUpdate(res)}>
                         <i className='fa fa-pencil'></i>
                       </button>
                       <button className='btn btn-xs btn-flat btn-danger' onClick={() => this.props.showDelete(res)}>
                         <i className='fa fa-trash-o'></i>
                       </button>
                   </div>
                   </td>
               </tr>
           ))
        }
    }

    render() {
        const headerTitle = ['ID', 'NAME', 'EMAIL', 'STATUS', 'DATE', 'ACTIONS']
        return (
            <div>
                <LoadingPage isActive={this.state.wating} />
                <table className='table'>
                    <thead>
                       <TableHead headerTitle={headerTitle}/>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = state => ({list: state.user.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UserList)
