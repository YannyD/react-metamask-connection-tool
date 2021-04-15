import styled from 'styled-components';

export const Bar = styled.div`
    flex-direction: column;
    background: white;
    border-radius: 15px;
    color: white;
    height: 250px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const InstallStatus = styled.button`
    color: ${(props) => (props.color ? props.color : 'black')};
    font-size: 14px;
    width: 80%;
    height: 15%;
    background: white;
    margin: 10px;
    border-radius: 5px 5px 20px 20px;
    border-color: ${(props) => (props.color ? props.color : 'black')};
    font-family: 'Lato', Calibri, Arial, sans-serif;

    
    &:enabled{cursor: pointer;}
    &:after:enabled {
        width: 100%;
        height: 0;
        top: 0;
        left: 0;
        background: #fff;
    }
    &:hover:enabled{
        color: white;
        background: ${(props) => (props.color ? props.color : 'black')};
    }

    &:disabled{
        background: green;
        color: white;
    }
`

export const Dot = styled.div`
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: ${(props)=>(props.color)};
    margin-bottom: 5px;
`

export const Connect = styled.button`
    background: ${(props)=>(props.background)};;
    font-size: 12px;
    color: ${(props)=>(props.color)};
    border-radius: 15px 15px 5px 5px;
    border-color: ${(props)=>(props.color)};
    font-family: 'Lato', Calibri, Arial, sans-serif;

    &:enabled{cursor: pointer;}
    &:after:enabled {
        width: 100%;
        height: 0;
        top: 0;
        left: 0;
        background: #fff;
    }
    &:hover:enabled{
        color: white;
        background: ${(props) => (props.color ? props.color : 'black')};
    }
`

export const Arrow = styled.p`
    color: ${(props)=>(props.color)};
    margin-top: -5px;
    margin-bottom: 0px;
`

export const AccountDetails = styled.div`
        flex-direction: column;
        display: ${(props)=>(props.display)};
        background: green;
        color: white;
        border-radius: 15px;
        font-family: 'Lato', Calibri, Arial, sans-serif;
        position:absolute;
        top:188px;
        width: 200px;
        justify-content: center;
`
export const AddressRow = styled.div`
        display: flex;
        flex-direction: column;
        margin-bottom: -5px;
        padding: 5px;

`

export const AccountLine = styled.p`
        color: black;
        font-size: 16px;
        color: white;
        margin-top: 35px;
`

export const CopyAccount = styled.button`
        background: white;
        font-size: 16px;
        color: green;
        margin: 0px;
        font-family: 'Lato', Calibri, Arial, sans-serif;
        border-radius: 5px;
        position: absolute;
        top: 10px;
        left: 7%;

`