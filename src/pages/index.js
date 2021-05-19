import React, { useReducer } from 'react';
import './index.css';
import Hamming from '../utils/hamming'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function Main() {

    const handleSubmit = event => {
        event.preventDefault();
        alert("submit");
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const decode_result = (results) => {
        return (
            <>
                <p className="hamming-message-text">
                    {results.decoded_message}
                </p>
                <p>
                    {results.error_position !== 0 &&
                        <p>
                            Havia um erro na posição {results.error_position} da mensagem.
                            <br/>
                            A mensagem correta é {results.encoded_message}.
                        </p>
                    }
                </p>
            </>
        );
    }

    const [formData, setFormData] = useReducer(formReducer, {});

    return (
        <div className="container">
            <header className="header">
                <h1 id="header-title">Código de Hamming</h1>
            </header>

            <div className="content">
                <section className="info-box">                    
                    <h3 className="info-box-title">O que é Código de Hamming?</h3>
                    <p>
                        O código de Hamming é um código de detecção e correção de erros, isto é, permite não apenas
                        detectar erros de um bit, mas também a localiza e corrige o bit errado. Diversas diversas 
                        técnicas do gênero são largamente utilizadas para transmissão de dados, seja entre computadores
                        na internet ou entre componentes de um mesmo computador.
                    </p>
                </section>
                <section className="info-box">
                    <h3 className="info-box-title">Como funciona?</h3>
                    <p>
                        O código de Hamming adiciona bits de paridade nas posições de base 2, ou seja, que correspondem
                        a 2<sup>x</sup>. Veja o exemplo abaixo:
                    </p>
                    
                    <table>
                        <tr>
                            <td><strong>Mensagem Normal</strong></td>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td><strong>Mensagem Codificada</strong></td>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td><strong>Formato da Codificação</strong></td>
                            <td>P1</td>
                            <td>P2</td>
                            <td>M1</td>
                            <td>P3</td>
                            <td>M2</td>
                            <td>M3</td>
                            <td>M4</td>
                        </tr>
                    </table>

                    <p>
                        Os bits de paridade estão nas posições P1, P2 e P3, correspondendo respectivamente às posições
                        1, 2 e 4 da mensagem. Observe que as posições são base 2 (2<sup>0</sup> = 1, 2<sup>1</sup> = 2, 2<sup>2</sup> = 4,);
                    </p>
                </section>
                <section className="info-box">
                    <h3 className="info-box-title">Codificação da Mensagem</h3>
                    <p>
                        Faça um teste! Escreva uma mensagem (em binário) e veja como ela ficará
                        depois da codificação do Código de Hamming.
                    </p>
                    <form className="forms" onSubmit={handleSubmit}>
                        <fieldset>
                            <label>
                                <p>Mensagem: </p>
                                <input name="encoded" onChange={handleChange}/>
                            </label>
                        </fieldset>
                    </form>

                    <p>
                        A messagem codificada é a seguinte: 
                    </p>
                    
                    {Object.entries(formData).map(([name, value]) => (
                        name === 'encoded' ? <p className="hamming-message-text" key={name}>{Hamming.encode(value.toString())[0]}</p> : ''
                    ))}

                </section>
                <section className="info-box">
                    <h3 className="info-box-title">Decodificação da Mensagem</h3>
                    <p>
                        Agora tente o contrário. Escreva uma mensagem (em binário) que estaja
                        codificada no formato do código de Hamming. 
                    </p>
                    <p>
                        Obs: Você pode pegar o código gerado na sessão de códificação. Tente 
                        inverter um bit (apenas um) para simular um erro de transmissão.
                    </p>

                    <form className="forms" onSubmit={handleSubmit}>
                        <fieldset>
                            <label>
                                <p>Mensagem: </p>
                                <input name="decoded" onChange={handleChange}/>
                            </label>
                        </fieldset>
                    </form>

                    <p>
                        A messagem decodificada é a seguinte: 
                    </p>

                    {Object.entries(formData).map(([name, value]) => (
                        name === 'decoded' ? decode_result(Hamming.decode(value)) : ''
                    ))}

                </section>
            </div>
        </div>
    );
}