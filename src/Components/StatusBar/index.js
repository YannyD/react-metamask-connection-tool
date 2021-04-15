import React, {useState, useEffect} from 'react'
import * as S from './style.js';
import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskOnboarding from '@metamask/onboarding';
import titleTooltip from '@yaireo/title-tooltip';
import '@yaireo/title-tooltip/title-tooltip.css';
import {reposition} from 'nanopop';

export default function StatusBar() {

// using Nanopop lib for positioning
titleTooltip({
  onShow: function(reference, popper){
    reposition(reference, popper,{position: 'bottom-middle'})
  }
})

  const addressCopy = async()=>{
    let copyText = await getConnectedAccount();
    let copyAddy = await copyText[0][0];
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = copyAddy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
  }

  const connectionAction = async (foundStatus)=>{
    if(foundStatus==true){
      setConnectText("\u2713 Connected")
      setStatusColor("green")
      setConnectDisable(true)
      setDisplayStatus("flex")
      getConnectedAccount().then((result)=>{
        setConnectedAddress(result[0][0].slice(0,7))
        if(result[1]=="0x1") setConnectedChain("Mainnet")
        else if(result[1]=="0x3") setConnectedChain("Ropsten")
        else if(result[1]=="0x4") setConnectedChain("Rinkeby")
        else if(result[1]=="0x5") setConnectedChain("Goerli")
        else if(result[1]=="0x2a") setConnectedChain("Kovam")
        else setConnectedChain("Unknown Chain")
      })
      setConnectBackground("green");
      setConnectTextColor("white")
  }
    else{
      setStatusColor("red");
      setConnectText("Connect Account");
      setConnectDisable(false)
      setDisplayStatus("none")
      setConnectBackground("white");
      setConnectTextColor("red")


    }
  }  
  
  //Ethereum.isMetaMask and detectEthereumProvider look for metamask installed in the browser
    const isMetaMaskInstalled = async () => {
      //Have to check the ethereum binding on the window object to see if it's installed
      const { ethereum } = window;
      let value = await detectEthereumProvider();

      return Boolean(ethereum && ethereum.isMetaMask && value===ethereum);
    };


    //enable metamask installation button
    const onboarding = new MetaMaskOnboarding();

    const onClickInstall = () => {
        setInstallText('Reload After Install');
        setInstallDisabledStatus(true);
        //On this object we have startOnboarding which will start the onboarding process for our end user
        onboarding.startOnboarding();
      };

      const onClickConnect = async () => {
        try {
          // Will open the MetaMask UI
          // You should disable this button while the request is pending!
          const { ethereum } = window;
          await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error(error);
        }
      }

      const getConnectedAccount = async () =>{
        try{
          const {ethereum} = window;
          const accounts = await ethereum.request({method: 'eth_accounts'})
          const chainId = await ethereum.request({method: 'eth_chainId'})
          return [accounts, chainId];
        }
        catch(error){
          console.log(error);
        }
      }
        let installed = false;
        let [installText, setInstallText]  = useState("Searching for MetaMask");
        let [ installDisabledStatus, setInstallDisabledStatus] = useState(false);
        let [connectText, setConnectText] = useState("Connect Account");
        let [statusColor, setStatusColor] = useState();
        let [connectDisable, setConnectDisable] = useState(false);
        let [installButtonColor, setInstallButtonColor] = useState();
        let [displayStatus, setDisplayStatus] = useState("none");
        let [connectedAddress, setConnectedAddress] = useState();
        let [connectedChain, setConnectedChain] = useState();
        let[connectBackground, setConnectBackground] = useState("white");
        let [connectTextColor, setConnectTextColor] = useState({statusColor})

    useEffect(
        async()=>{
          const {ethereum} = window;
            installed = await isMetaMaskInstalled();
            if(installed) {
              setInstallButtonColor("green");
              setInstallText("MetaMask Installed");
              setInstallDisabledStatus(true);
              setConnectDisable(false)
              let activeAccounts = await getConnectedAccount();
              if(activeAccounts[0].length>0){
                connectionAction(true);
              }
              else{
                connectionAction(false);
              }

              ethereum.on('accountsChanged', (accounts) => {
                if(accounts.length>0){
                  connectionAction(true);
                }
                else {
                  connectionAction(false);
                }  
              }) 
            }
            else {
                setInstallText("Install MetaMask");
                setInstallButtonColor("red")
                setConnectDisable(true);
                setStatusColor("grey");
            }
    }, []
    )

    return (
        <S.Bar>
            <S.InstallStatus color = {installButtonColor} disabled = {installDisabledStatus} onClick = {()=>onClickInstall()}>{installText}</S.InstallStatus>
            <S.Dot color={statusColor}></S.Dot>
            <S.Dot color={statusColor}></S.Dot>
            <S.Dot color={statusColor}></S.Dot>
            <S.Arrow color={statusColor}>{"\u25bc"}</S.Arrow>
            <S.Connect background={connectBackground} disabled = {connectDisable} color={connectTextColor} onClick={()=>onClickConnect()}>{connectText}</S.Connect>
            <S.AccountDetails display={displayStatus}>
              <S.AddressRow>
                <S.CopyAccount onClick={()=>addressCopy()} title="Click to Copy Full Address">Address Starts: <b>{connectedAddress}</b></S.CopyAccount>
                <S.AccountLine>Chain: <b>{connectedChain}</b></S.AccountLine>  
              </S.AddressRow>
            </S.AccountDetails>
        </S.Bar>
    )
}
