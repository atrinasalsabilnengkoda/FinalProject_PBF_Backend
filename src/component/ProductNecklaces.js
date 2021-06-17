import React, { Component } from 'react';
import firebase from "firebase";
import Navbar from './Navbar';
import Footer from './Footer';
import Necklaces from '../container/Necklaces';

class ProductNecklaces extends Component {
    constructor(props) {
        super(props);
        this.state = {          // Komponen state dari React untuk statefull component
            listNecklaces: []     // Variabel array yang digunakan untuk menyimpan data dari API
        }
    }

    ambilDataDariServerAPI = () => {    // fungsi untuk mengambil data dari API dengan penambahan sort dan order
        let ref = firebase.database().ref('/');
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    }

    simpanDataKeServerAPI = () => {
        firebase.database()
        .ref("/")
        .set(this.state);
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.simpanDataKeServerAPI();
        }
    }

    handleHapusNecklaces = (idNecklaces) => {
        const {listNecklaces} = this.state;
        const newState = listNecklaces.filter(data => {
            return data.id !== idNecklaces;
        });
        this.setState({listNecklaces: newState});
    }

    handleTombolTambah = () => {
        let name = this.refs.name.value; // this.refs mengacu pada input field (input text, textarea, dll)
        let price = this.refs.price.value;
        let image = this.refs.image.value;
        let material = this.refs.material.value;
        let weight = this.refs.weight.value;
        let desc = this.refs.desc.value;
        let id = this.refs.id.value;

        if (id && name && price && image && material && weight && desc) { //cek apakah seua data memiliki nilai (tidak null)
            const {listNecklaces} = this.state;
            const indeksNecklaces = listNecklaces.findIndex(data => {
                return data.id === id;
            });
            listNecklaces[indeksNecklaces].name = name;
            listNecklaces[indeksNecklaces].price = price;
            listNecklaces[indeksNecklaces].image = image;
            listNecklaces[indeksNecklaces].material = material;
            listNecklaces[indeksNecklaces].weight = weight;
            listNecklaces[indeksNecklaces].desc = desc;
            this.setState({listNecklaces});
        } else if (name && price && image && material && weight && desc) { // jika data belum ada di server
            const id = new Date().getTime().toString();
            const { listNecklaces } = this.state;
            listNecklaces.push({id, name, price, image, material, weight, desc});
            this.setState({ listNecklaces });
        }

        this.refs.name.value = "";
        this.refs.price.value = "";
        this.refs.image.value = "";
        this.refs.material.value = "";
        this.refs.weight.value = "";
        this.refs.desc.value = "";
        this.refs.id.value ="";
    };

    render() {
        return (
            <div className="col-lg-12 bg-light">
                <Navbar /> <br/><br/>
                <div className="container">
                    <div className="row" id="product">
                        <div className="col-5">
                        <h4 className="text-center">✏️ Tambah Data Baru Necklaces</h4><br></br>
                        <div className="form pb-2 bg-info p-4">
                            <br/>
                            <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Nama</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="name" name="name" ref="name"/>
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Harga</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="price" name="price" ref="price"/>
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Material</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="material" name="material" ref="material"/>
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Weight</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="weight" name="weight" ref="weight"/>
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Link Gambar</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="image" name="image" ref="image"/>
                                    </div>
                                    </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Deskripsi</b></h5></label>
                                        <div className="col-sm-8">
                                            <textarea name="desc" id="desc" cols="3" rows="3" className="form-control" col="3" ref="desc"></textarea>
                                        </div>
                                </div>
                                <input type="hidden" name="id" ref="id"/>
                                <br />
                                <div className="form-group row p-2">
                                    <div className="col-sm-5"></div>
                                    <button type="submit" className="btn btn-primary col-sm-2 align-center" onClick={this.handleTombolTambah} >Simpan</button>
                                    <div className="col-sm-5"></div>
                                </div>
                                <br/>
                            </div>
                            <br/>
                        </div>

                        <div className="col-7">
                            <h4 className="text-center">💍 Produk Necklaces</h4><br></br>
                            {
                                this.state.listNecklaces.map(necklaces => {
                                    return <Necklaces key={necklaces.id} name={necklaces.name} price={necklaces.price} image={necklaces.image} material={necklaces.material} weight={necklaces.weight} desc={necklaces.desc}  hapusNecklaces = {() => this.handleHapusNecklaces(necklaces.id)}/>
                                })
                            }
                            <br/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ProductNecklaces;