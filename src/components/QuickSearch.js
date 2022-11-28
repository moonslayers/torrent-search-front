import React, { Component } from 'react'
import axios from 'axios'
const backend = process.env.REACT_APP_API

export default class QuickSearch extends Component {
    state = {
        results: [],
        name: '',
        tab: 1,
        numbers: "hidden",
        sugestions: [],
        sugestion: "visible"
    }
    async componentDidMount(){
        const res = await axios.get(backend+'/api/torrent-search/searchs')
        this.setState({sugestions: res.data})
    }
    quickSearch = async () => {
        const res = await axios.get(backend+'/api/torrent-search/'+this.state.name+'/100');
        await axios.post(backend+'/api/torrent-search/searchs',{ searchname: this.state.name });
        this.setState({results: res.data});
    }
     onSubmit = async e => {
        e.preventDefault();
        this.quickSearch();
        this.state.numbers="visible"
        this.state.sugestion="hidden"
    }
    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    feelingLucky = async () => {
        const res = await axios.get(backend+'/api/torrent-search/'+this.state.name+'/1');
        this.setState({results: res.data});
        await res.data.map(result => ( window.open(result.magnet === undefined? result.desc: result.magnet) ));
    }
    nextPage = async (e) => {
        this.setState({
            tab: e
        })
    }
    nextColor = async (e) => {
      if(e === this.state.tab){
        return(true)
      }else{
        return(false)
      }
    }
    sugestionClick= async (c)=>{
      this.setState({
        name: c
      })
    }
    render() {
        return (
            <div className="container">
                <div className="container-fluid m-2">
                <form autoComplete="off" onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-lg-8">
                        <input
                          id="search_id"
                          className="form-control m-1"
                          name="search"
                          placeholder="Did Somebody say something about the torrent?"
                          type="text"
                          value={this.state.name}
                          onChange={this.onChangeName}
                        />
                    </div>
                    <div className="col">
                      <button type="submit" className="btn btn-dark m-1">
                          Search
                      </button>
                      <i className="btn btn-light m-1" onClick={() =>this.feelingLucky()}>
                          I'm feelin lucky
                      </i>
                    </div>
                  </div>
                </form>
                </div>
                <div className="container-fluid m-2" style={{ visibility: this.state.sugestion === "visible" ? "hidden" : "visible" }} >
                    <ul className="list-group">
                        {
                            this.state.results.slice((this.state.tab-1)*10,this.state.tab*10).map(result => (
                                 <a href={result.desc === undefined? result.magnet: result.desc } target="_blank" rel="noopener noreferrer" className="list-group-item list-group-item-action flex-column align-items-start">
                                  <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{result.title}</h5>
                                    <small className="text-muted">{result.provider}</small>
                                  </div>
                                  <p className="mb-1">{result.desc=== undefined? (result.magnet===undefined? "No information": "GET MAGNET") : result.desc}</p>
                                  <small className="text-muted">size:{result.size} peers:{result.peers} seeds:{result.seeds}</small>
                                </a>)
                            )
                        }
                    </ul>
                </div>
                <ul className="nav nav-pills m-4" style={{ visibility: this.state.numbers === "hidden" ? "hidden" : "visible" }}>
                  <li className="nav-item">
                    <button className={this.state.tab=== 1? "btn btn-light m-1":"btn btn-dark m-1"}
                      onClick={() =>this.nextPage(1)}>1</button>
                  </li>
                  <li className="nav-item">
                    <button className={this.state.tab=== 2? "btn btn-light m-1":"btn btn-dark m-1"}
                      onClick={() =>this.nextPage(2)}>2</button>
                  </li>
                  <li className="nav-item">
                    <button className={this.state.tab=== 3? "btn btn-light m-1":"btn btn-dark m-1"}
                    onClick={() =>this.nextPage(3)}>3</button>
                  </li>
                  <li className="nav-item">
                    <button className={this.state.tab=== 4? "btn btn-light m-1":"btn btn-dark m-1"}
                    onClick={() =>this.nextPage(4)}>4</button>
                  </li>
                  <li className="nav-item">
                    <button className={this.state.tab=== 5? "btn btn-light m-1":"btn btn-dark m-1"}
                    onClick={() =>this.nextPage(5)}>5</button>
                  </li>
                  <li className="nav-item">
                    <button className={this.state.tab=== 6? "btn btn-light m-1":"btn btn-dark m-1"}
                    onClick={() =>this.nextPage(6)}>6</button>
                  </li>
                  <li className="nav-item">
                    <button className={this.state.tab=== 7? "btn btn-light m-1":"btn btn-dark m-1"}
                    onClick={() =>this.nextPage(7)}>7</button>
                  </li>
                  <li className="nav-item">
                    <button className={this.state.tab=== 8? "btn btn-light m-1":"btn btn-dark m-1"} 
                    onClick={() =>this.nextPage(8)}>8</button>
                  </li>
                  <li className="nav-item">
                    <button className={this.state.tab=== 9? "btn btn-light m-1":"btn btn-dark m-1"} onClick={() =>this.nextPage(9)}>9</button>
                  </li>
                  <li className="nav-item">
                    <button className={this.state.tab=== 10? "btn btn-light m-1":"btn btn-dark m-1"} onClick={() =>this.nextPage(10)}>10</button>
                  </li>
                </ul>
                <div className="container-fluid m-2" style={{ visibility: this.state.sugestion === "hidden" ? "hidden" : "visible" }}>
                  <h3 style={{ color:"#FFFFFF"}}>Hot searchs today!</h3>
                  <ul className="list-group">
                    {
                      this.state.sugestions.map(sug => (
                        <li className="list-group-item" onClick={() =>this.sugestionClick(sug.searchname)}>{sug.searchname}</li>
                      ))
                    }
                  </ul>
                </div>
           </div>
        )
    }
}
