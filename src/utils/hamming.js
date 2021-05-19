function checkParity(encoded_message, parity_postision){
    let parity = 0, sum = 0;

    //console.log(`[checkParity] : start : message = ${encoded_message}`);

    for(let i = parity_postision; encoded_message[i-1] !== undefined; i+=(parity_postision*2)){
        //console.log("[checkParity] : i = " + i);
        for(let j = 0; j < parity_postision; j++){
            //console.log(`[checkParity] : pos = ${i-1+j} | bit = ${encoded_message[i-1+j]}`)
            if(i-1+j === parity_postision-1) continue;
            if(encoded_message[i-1+j] !== undefined) sum += Number(encoded_message[i-1+j]);
        }
    }

    
    parity = sum % 2 === 0 ? 0 : 1;

    //console.log(`[checkParity] : end | sum = ${sum} and parity = ${parity}`);

    return parity.toString();
}

function encode(message){

    let encoded_message = message;

    for(let i = 0; encoded_message[(2**i)-1] !== undefined; i++){
        const position = (2**i)-1;
        encoded_message = encoded_message.substring(0, position) + "0" + encoded_message.substring(position);
    }

    for(let i = Math.ceil(Math.log2(encoded_message.length)); i > -1; i--){
        let parity = 0;
        
        if(2**i > encoded_message.length) continue;
        //console.log("[encode] : start check from " + 2**i);
        parity = checkParity(encoded_message, 2**i);
        //console.log("[encode] : end check");
        encoded_message = encoded_message.substring(0, (2**i)-1) + parity + encoded_message.substring((2**i));
    }

    return [encoded_message, message];
}

function decode(encoded_message){
    let received_message = encoded_message;
    let decoded_message = "";
    let error_list_detected = [];
    let new_parity_check = [];

    for(let i = Math.ceil(Math.log2(encoded_message.length)); i > -1; i--){
        if(2**i > encoded_message.length) continue;
        //console.log("[decode] : start check from " + 2**i);
        let parity = checkParity(encoded_message, 2**i);
        //console.log(`[decode] : parity = ${parity} | encode_parity = ${encoded_message[(2**i)-1]} | position = ${(2**i)-1}`)
        
        error_list_detected.push(encoded_message[(2**i)-1]);
        new_parity_check.push(parity);
        
        //console.log("[decode] : end check");
    }

    //console.log(`[decode] : Error list: ${error_list_detected} | Parity check: ${new_parity_check}`);
    let error_position = parseInt(error_list_detected.join(""), 2) ^ parseInt(new_parity_check.join(""), 2);
    //console.log(`[decode] : Error position ${error_position}`);

    if(error_position !== 0){
        let corrected_bit = encoded_message[error_position-1] === '0' ? '1' : '0';
        //console.log(`[decode] : encoded message: ${encoded_message}`);
        //console.log(`[decode] : error position value: ${encoded_message[error_position-1]} corrected bit: ${corrected_bit}`);
        encoded_message = encoded_message.substring(0, error_position-1) + corrected_bit + encoded_message.substring(error_position);
    }

    for(let i = 0; i < encoded_message.length; i++){
        if(Number.isInteger(Math.log2(i+1))) continue;
        
        decoded_message = decoded_message + encoded_message[i];
    }

    return {encoded_message, decoded_message, received_message, error_position};
}

module.exports = {
    encode,
    decode
}

//console.log(decode("01111001111101011"));

// 0 1 0 0 0 0 0 1
// p p 0 p 1 0 0 p 0 0 0 1
// 1 0 0 0 1 0 0 1 0 0 0 1

// 1 0 1 0 1
// p p 1 p 0 1 0 p 1
// 0 0 1 1 0 1 0 1 1

// 0 1 0 0 1 1 1 1 0 1 0 1
// p p 0 p 1 0 0 p 1 1 1 1 0 1 0 p 1
// 0 1 0 1 1 0 0 1 1 1 1 1 0 1 0 1 1