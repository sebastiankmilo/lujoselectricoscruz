import React, { useRef, useEffect } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';
import { Avatar, Button, TextField, Select, MenuItem, InputLabel, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import variables from '../environment'

class Taco extends React.Component {


    constructor(props) {
        super(props);
        // Initial state is defined
        this.state = {
            img: '',
            codigo: '',
            proveedor: '',
            fecha: '',
            precioVenta: '',
            precioCompra: '',
            codigoRojo: '',
            open: false,
            message: '',
            severety: '',

        };

        this.canvas1Ref = React.createRef();
        this.ctx1 = null;

        this.canvas2Ref = React.createRef();
        this.ctx2 = null;
        this.N_PART = 3;

        this.onInputchange = this.onInputchange.bind(this);

        // E R A S M O C R U Z
        // 1 2 3 4 5 6 7 8 9 0
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {


        /*         const canvas2Ele = this.canvas2Ref.current;
                this.ctx2 = canvas2Ele.getContext("2d");
        
                const r1Info = { x: 20, y: 30, w: 100, h: 50 };
                const r1Style = { borderColor: '#000', borderWidth: 2 }; */
        //  this.drawRect(r1Info, r1Style);

    }


    drawRect(info, style = {}) {
        const { x, y, w, h } = info;
        const { borderColor = 'black', borderWidth = 1 } = style;

        this.ctx2.beginPath();
        this.ctx2.strokeStyle = borderColor;
        this.ctx2.lineWidth = borderWidth;
        this.ctx2.rect(x, y, w, h);
        this.ctx2.stroke();
    }



    onTakePhoto = async (dataUri) => {
        //console.log(dataUri);
        this.setState((previousState) => {
            return {
                img: dataUri
            };
        });
        this.updateCanvas(dataUri);
        // const config = {
        //     sizeFactor: 1,
        //     imgCompression: .5
        // };
        //this.doSendGoogleApi(dataUri)
    }

    //end of take photo

    onCameraError(error) {
        console.error('onCameraError', error);
    }

    onCameraStart(stream) {
        console.log('onCameraStart');
    }

    onCameraStop() {
        console.log('onCameraStop');
    }

    updateCanvas(dataUri) {

        const canvas1Ele = this.canvas1Ref.current;
        this.ctx1 = canvas1Ele.getContext("2d");
        this.ctx1.beginPath();

        const image = new Image();
        //parte 1
        let hy1 = canvas1Ele.height - canvas1Ele.height * 30 / 100
        let wx1 = canvas1Ele.width - canvas1Ele.width * 25 / 100
        let offsetX1 = 0
        let offsetY1 = 0
        //parte2
        let hy2 = canvas1Ele.height - canvas1Ele.height * 30 / 100
        let wx2 = canvas1Ele.width - canvas1Ele.width * 25 / 100
        let offsetX2 = 0
        let offsetY2 = canvas1Ele.height - canvas1Ele.height * 30 / 100

        //parte3
        let hy3 = canvas1Ele.height - canvas1Ele.height * 30 / 100
        let wx3 = canvas1Ele.width - canvas1Ele.width * 25 / 100
        let offsetX3 = canvas1Ele.width - canvas1Ele.width * 25 / 100
        let offsetY3 = canvas1Ele.height - canvas1Ele.height * 30 / 100

        image.onload = () => {
            this.ctx1.drawImage(image, 0, 0, canvas1Ele.width, canvas1Ele.height)
            this.ctx1.beginPath();

            //LINEA HORIZONTAL
            //                x , y
            this.ctx1.moveTo(0, hy1)
            this.ctx1.lineTo(canvas1Ele.width, hy1);

            // LINEA VERTICAL 
            this.ctx1.moveTo(wx1, 0)
            this.ctx1.lineTo(wx1, canvas1Ele.height);


            this.ctx1.strokeStyle = 'red'
            this.ctx1.stroke();
        }
        image.src = dataUri;
        // this.getArea(canvas1Ele, offsetX1, offsetY1, wx1, hy1)
        // this.getArea(canvas1Ele, offsetX2, offsetY2, wx2, hy2)

        let part1 = new Promise((resolve, reject) => {

            this.getArea(canvas1Ele, offsetX1, offsetY1, wx1, hy1).then((res) => {
                //console.log(res.fullTextAnnotation.text);
                if (res.fullTextAnnotation) {
                    resolve(res.fullTextAnnotation)
                } else {
                    resolve("texto no encontrado")
                }
            })

        });

        part1.then((res1 => {
            let part2 = new Promise((resolve, reject) => {
                this.getArea(canvas1Ele, offsetX2, offsetY2, wx2, hy2).then((res) => {
                    //console.log(res.fullTextAnnotation.text);
                    if (res.fullTextAnnotation) {
                        resolve(res.fullTextAnnotation.text)
                    } else {
                        resolve("texto no encontrado")
                    }
                })

            });

            part2.then(res2 => {
                let part3 = new Promise((resolve, reject) => {
                    this.getArea(canvas1Ele, offsetX3, offsetY3, wx3, hy3).then((res) => {
                        // console.log(res.fullTextAnnotation.text);

                        if (res.fullTextAnnotation) {
                            resolve(res.fullTextAnnotation.text)
                        } else {
                            resolve("texto no encontrado")
                        }
                    })

                });

                part3.then(res3 => {
                    console.log(res1.text);
                    let codigoProducto = res1 ? this.splitLines(res1.text)[0] : ''

                    /*                  console.log('this.splitLines(res1.text)', this.splitLines(res1.text)[0]);
                                      console.log('codigoProducto', codigoProducto); */

                    let x = res1 ? this.splitLines(res1.text)[2] : ''


                    let proveedor = x ? this.splitSpaces(x)[0] : ''
                    let fechaAdquisicion = x ? this.splitSpaces(x)[1] : ''
                    let precioVenta = x ? this.splitSpaces(x)[2] : ''
                    console.log(x.length ? this.splitSpaces(x) : '');
                    let codigoRojo = res3.length ? this.splitLines(res3)[0] : ''
                    let precio = res2.length ? this.splitLines(res2)[0] : ''
                    precio = precio.replace('-', '.')

                    console.log('codigoRojo', codigoRojo);
                    console.log('precioCompra', precio);

                    console.log('proveedor', proveedor);
                    console.log('codigoProducto', codigoProducto);
                    console.log('fechaAdquisicion', fechaAdquisicion);
                    console.log(this.decrypPrecio(precioVenta));

                    this.setState({
                        codigo: codigoProducto,
                        proveedor: proveedor,
                        fecha: fechaAdquisicion,
                        precioVenta: this.decrypPrecio(precioVenta),
                        precioCompra: precio,
                        codigoRojo: codigoRojo,
                    });

                    //enviar datos

                    //codigoProducto , proveedor , fecha de adquisicion del producto, precio venta, precio Compra

                    /*                     let precio = this.this.splitLines(res2)[0]
                                        let codigoRojo = this.splitLines(res3)[0]
                                        console.log(precio);
                                        console.log(codigoRojo); */
                })

            })

        }))


    }

    //CANVAS , POSICION EN X ,  POSICION Y , ANCHO , ALTO
    getArea(canvas, offsetX, offsetY, width, height) {


        const canvas2Ele = this.canvas2Ref.current;
        this.ctx2 = canvas2Ele.getContext("2d");
        this.ctx2.beginPath();

        const image = new Image();

        image.onload = () => {
            //this.ctx2.drawImage(image, 10, 10, width, height)
            var imgData = this.ctx1.getImageData(offsetX, offsetY, width, height);
            this.ctx2.putImageData(imgData, 0, 0);
        }


        let read = new Promise((resolve, reject) => {

            setTimeout(() => {
                //console.log(canvas.toDataURL());
                image.src = canvas.toDataURL()
                setTimeout(() => {
                    //console.log(canvas2Ele.toDataURL());
                    (async () => {
                        let res = await this.doSendGoogleApi(canvas2Ele.toDataURL())
                        console.log(res)
                        if (res.data.responses[0]) {
                            resolve(res.data.responses[0])
                        }
                    })()

                }, 500);

            }, 500);

        })

        return read
        /* read.then((e) => {
            console.log(e);
        })
 */

    };

    async doSendGoogleApi(dataUri) {
        //console.log(dataUri);
        var data = {
            requests: [
                {
                    image: {
                        content: dataUri.includes('png') ? dataUri.slice(22) : dataUri.slice(23),
                    },
                    features: [{
                        type: "TEXT_DETECTION",
                        maxResults: 5
                    }]
                }
            ]
        }
        return await axios({
            method: 'post',
            url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAqc1gUL7iNXSwdBWGPJNZ-MomSfJ9iFHM',
            data,
            config: { headers: { 'Content-Type': 'application/json' } }
        })
        /*             .then((r) => {
                        console.log(r);
        
                        let array = r.data.responses[0]
                        for (let x = 1; x < array.length; x++) {
                            if (array[x].description.includes('-')) {
                                console.log('if..');
                                return this.props.cameraOffAndSetInput(array[x].description)
                            }
                        }
                        return array
                    }) */

        /*         .catch((error) => {
                    console.log(error);
                }) */

    }

    splitLines(t) {
        if (t) {
            return t.split(/\r\n|\r|\n/);
        }
    }
    splitSpaces(t) {
        if (t) {
            return t.split(' ');
        }
    }
    decrypPrecio(v) {
        console.log(v);
        if (v) {
            v.replace('0', 'O')
            v.replace('00', 'OO')
            // E R A S M O C L U Z
            // 1 2 3 4 5 6 7 8 9 0
            let r = v.replace(/S/g, '$').replace(/E/g, '1').replace(/R/g, '2').replace(/A/g, '3').replace(/S/g, '4').replace(/M/g, '5').replace(/O/g, '6').replace(/C/g, '7').replace(/L/g, '8').replace(/U/g, '9').replace(/Z/g, '0')
            return r;
        }
    }

    sendInfoTaco = () => {
        const { codigo, proveedor, fecha, precioVenta, precioCompra, codigoRojo } = this.state;

        if (codigo &&
            proveedor &&
            fecha &&
            precioVenta &&
            precioCompra &&
            codigoRojo) {
            //ajax1234567

            console.log('se puede enviar');


            fetch(variables.urlApi, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "host": "127.0.0.1",
                        "port": 9000,
                        "database": "lujosec",
                        "username": "admin",
                        "password": "1234567",
                        "model": "sale_taco",
                        "method": "create",
                        "options":
                        {

                            "codigo": /*codigo*/ '2LDT15831',
                            "proveedor": proveedor,
                            //  "fecha": new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/'+ new Date().getDate(),
                            "fecha": fecha,
                            "precio_compra": precioCompra.replace(/\D/gm, ""), //dejar solo numeros
                            "precio_venta": precioVenta.replace(/\D/gm, ""),  //dejar solo numeros
                            "codigo_taco": codigoRojo
                        }
                    }
                ),
            })
                .then(response => response.json())
                .then(responseJson => {

                    if (responseJson['message'].includes('200')) {

                        this.setState({
                            open: true,
                            message: 'Success !!',
                            severity: 'success',
                            codigo: '',
                            proveedor: '',
                            fecha: '',
                            precioVenta: '',
                            precioCompra: '',
                            codigoRojo: '',
                        });

                    } else {
                        this.setState({ open: true, message: 'No se puede actualizar', severity: 'warning' })

                    }

                })
                .catch(error => {
                    console.log(error);
                });



        } else {
            //open alert
            console.log('NO puede enviar');

            this.setState({ open: true, message: 'Completa todos los campos', severity: 'warning' })
            let _self = this
            setTimeout(() => {
                _self.setState = ({
                    open: false
                })
            }, 2000);
        }

        console.log(codigo);
        console.log(proveedor);
        console.log(fecha);
        console.log(precioVenta);
        console.log(precioCompra);
        console.log(codigoRojo);
    };



    render() {




        return (

            <div className="start-job-container p-1 mt-5">
                <Camera
                    onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
                    onCameraError={(error) => { this.onCameraError(error); }}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    idealResolution={{ width: 640, height: 480 }}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.97}
                    isMaxResolution={false}
                    isImageMirror={false}
                    isSilentMode={true}
                    isDisplayStartCameraError={true}
                    isFullscreen={false}
                    sizeFactor={1}
                    onCameraStart={(stream) => { this.onCameraStart(stream); }}
                    onCameraStop={() => { this.onCameraStop(); }}
                    className="mt-5"
                />
                <p></p>

                <canvas id='canvas1' ref={this.canvas1Ref} className='col-auto mx-auto d-flex   p-1' height="280" > </canvas>

                <canvas id="canvas2" ref={this.canvas2Ref} className='col-auto mx-auto d-flex   p-1' height="280"> </canvas>



                <div className="container-fluid ">
                    <div className='row '>
                        <div className='col-12 d-flex mt-4'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Codigo" name="codigo"
                                type="text"
                                value={this.state.codigo}
                                onChange={this.onInputchange}
                                variant="filled" />
                        </div>

                        <div className='col-12 d-flex mt-4'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Proveedor" name="proveedor"
                                type="text"
                                value={this.state.proveedor}
                                onChange={this.onInputchange}
                                variant="filled" />
                        </div>
                        <div className='col-12 d-flex mt-4'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Fecha" name="fecha"
                                type="text"
                                value={this.state.fecha}
                                onChange={this.onInputchange}
                                variant="filled" />
                        </div>
                        <div className='col-12 d-flex mt-4'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Precio compra" name="precioCompra"
                                type="text"
                                value={this.state.precioCompra}
                                onChange={this.onInputchange}
                                variant="filled" />
                        </div>
                        <div className='col-12 d-flex mt-4'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Precio Venta" name="precioVenta"
                                type="text"
                                value={this.state.precioVenta}
                                onChange={this.onInputchange}
                                variant="filled" />
                        </div>
                        <div className='col-12 d-flex mt-4'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Codigo Taco" name="codigoRojo"
                                type="text"
                                value={this.state.codigoRojo}
                                onChange={this.onInputchange}
                                variant="filled" />
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-* mx-auto'>
                            <Button variant="contained" onClick={this.sendInfoTaco} className='mt-2 ' color="secondary"  >
                                Enviar
                            </Button>
                        </div>

                    </div>



                    <Snackbar
                        open={this.state.open}
                        autoHideDuration={3000}
                    >

                        <Alert severity={this.state.severity}>
                            {this.state.message}
                        </Alert>
                    </Snackbar>

                    <br></br>
                    <br></br>
                </div>
            </div>

        );
    }
}

export default Taco;