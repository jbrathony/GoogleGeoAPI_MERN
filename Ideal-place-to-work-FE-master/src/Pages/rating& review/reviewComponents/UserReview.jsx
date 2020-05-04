import React, {Component} from 'react';
import moment from "moment";
import Api from "../../../Api";
import "../UserReview.css"
import ReactPaginate from 'react-paginate';


class UserReview extends Component {
    state = {
        loading: false,
        error: "",
        rating: 5,
        shownComments: [],
        comment: {
            rate: "",
            message: ""
        }
    };
    deleteComment = this.deleteComment.bind(this);
    // handleFieldChange = this.handleFieldChange.bind(this);
    // onSubmit = this.onSubmit.bind(this);
    editComment = this.editComment.bind(this);

    handleFieldChange = event => {
        const {value, name} = event.target;

        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [name]: value
            },
            comments: []
        });
    };

    refreshData() {
        // Api.fetch(this.props.places).then(res => {
        //     let avgRate = 0;
        //     if (res) {
        //         res.forEach(c => (avgRate += c.rate));
        //     }
        //     avgRate = avgRate / res.length;
        //     this.setState({comments: res, avgRate});
        // });
        if (this.props.placeId) {
            Api.fetch(
                "/reviewsForPlace/" + this.props.placeId,
                "GET").then(res => {
                const pages = Math.ceil(res.total / 5);
                this.setState({comments: res.reviews.reverse(), total: res.total, pages: pages});
                this.handlePageClick({selected: 0});
            });
        }
    }

    componentDidMount() {
        // this.interval = setInterval(() => this.refreshData(), 10000);
        this.refreshData();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    onSubmit(e) {
        // prevent default form submission
        e.preventDefault();
        const data = {
            comment: this.state.comment.message,
            rate: this.state.rating,
            elementId: this.props.places
        };
        console.log(data);
        if (this.state.comment._id) {
            this.crud.put(this.state.comment._id, data).then(r => {
                console.log(r);
                this.refreshData();
                this.setState({
                    comment: {
                        rate: "",
                        message: ""
                    }
                });
            });
        } else {
            this.crud.post(data).then(r => {
                console.log(r);
                this.refreshData();
                this.setState({
                    comment: {
                        rate: "",
                        message: ""
                    }
                });
            });
        }
    }

    renderError() {
        return this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
        ) : null;
    }


    deleteComment(id) {
        console.log(id.currentTarget.name);
        this.crud.delete(id.currentTarget.name).then(result => {
            console.log(result);
            this.refreshData();
        });

    }

    editComment(id) {
        const c = this.state.comments.find((comment) => id.currentTarget.name === comment._id);
        if (c) {
            const editComment = JSON.parse(JSON.stringify(c));
            editComment.message = editComment.comment;
            this.setState({comment: editComment, rating: editComment.rate});
        }
    }

    handlePageClick = (select) => {
        const {selected} = select;
        this.setState({shownComments: this.state.comments.slice(selected * 5, (selected * 5) + 5)});
        console.log(selected);
    }

    render() {
        return (
            <>
                <div>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.pages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
                <div style={{'margin-top': '10px'}}>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {this.state.shownComments &&
                        this.state.shownComments.map(comment => (

                            <div id="plx-card" className="animated bounce" style={{
                                'border': 'solid 2px black',
                                'border-radius': '5px',
                                flex: "0 1 100%",
                                "margin": '5px',
                                marginBottom: '20px'
                            }}>
                                <div key={comment._id} className="user-review-header-container"
                                     style={{'display': 'flex'}}>
                                    <div><img className="user-review-image"
                                              src={comment.UserId?.picture} alt=""/></div>
                                    <div className="user-review-username">
                                        {comment.UserId?.firstname} {comment.UserId?.lastname}
                                    </div>
                                    <div className="created-at">| commented {moment(comment.createdAt).fromNow()}</div>
                                </div>
                                <div>
                                    <div className="user-review-text">{comment.Text}</div>
                                    {/*<button className={'btn btn-sm'} name={comment._id} onClick={this.editComment}><i*/}
                                    {/*    className="material-icons">edit</i></button>*/}
                                    {/*<button className={'btn btn-sm'} name={comment._id} onClick={this.deleteComment}><i*/}
                                    {/*    className="material-icons">delete</i></button>*/}
                                </div>
                            </div>))
                        }
                    </div>
                </div>
            </>)
    }
}

export default UserReview;
