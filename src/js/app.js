// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

//import Accordion from './components/accordion';
import { isInteger } from "validate.js";
import initAccordion from "./components/accordion";
import burgerMenu from "./components/burger-menu";
import tabs from "./components/tabs";

(($) => {
  // When DOM is ready
  $(() => {
    tabs.init();
    initAccordion();
    burgerMenu.init();

		setTimeout(() => {
			window.scrollTo({
				top: 0
			});

		}, 500)


		////

    const Web3Modal = window.Web3Modal.default;
    const WalletConnectProvider = window.WalletConnectProvider.default;
    const Fortmatic = window.Fortmatic;
    const evmChains = window.evmChains;
    
    let web3Modal
    
    
    let provider;
    
    let selectedAccount;
    
    function init() {
    
      console.log("Initializing example");
      console.log("WalletConnectProvider is", WalletConnectProvider);
      console.log("Fortmatic is", Fortmatic);
      console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);
    
    //   if(location.protocol !== 'https:') {
    //     // https://ethereum.stackexchange.com/a/62217/620
    //     const alert = document.querySelector("#alert-error-https");
    //     alert.style.display = "block";
    //     document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    //     return;
    //   }
    
      
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
          }
        },
    
        fortmatic: {
          package: Fortmatic,
          options: {
            key: "pk_test_391E26A3B43A3350"
          }
        }
      };
    
      web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions, 
        disableInjectedProvider: false, 
      });
    
      console.log("Web3Modal instance is", web3Modal);
    }
    
    
    
    async function fetchAccountData() {
      const web3 = new Web3(provider);
    
      console.log("Web3 instance is", web3);
    
      const chainId = await web3.eth.getChainId();
      const chainData = evmChains.getChain(chainId);
      // document.querySelector("#network-name").textContent = chainData.name;
    
      const accounts = await web3.eth.getAccounts();
    
      console.log("Got accounts", accounts);
      selectedAccount = accounts[0];
    
      // document.querySelector("#selected-account").textContent = selectedAccount;
      // const template = document.querySelector("#template-balance");
      // const accountContainer = document.querySelector("#accounts");
      // accountContainer.innerHTML = '';
    
      const rowResolvers = accounts.map(async (address) => {
        // const balance = await web3.eth.getBalance(address);
        // const ethBalance = web3.utils.fromWei(balance, "ether");
        // const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
        // const clone = template.content.cloneNode(true);
        // clone.querySelector(".address").textContent = address;
        // clone.querySelector(".balance").textContent = humanFriendlyBalance;
        // accountContainer.appendChild(clone);
      });
    
      await Promise.all(rowResolvers);
      document.querySelector("#prepare").style.display = "none";
      document.querySelector("#prepare-mob").style.display = "none";
      document.querySelector("#connected").style.display = "block";
      document.querySelector("#connected-mob").style.display = "block";
    }
    
    async function refreshAccountData() {
      document.querySelector("#connected").style.display = "none";
      document.querySelector("#connected-mob").style.display = "none";
      document.querySelector("#prepare").style.display = "block";
      document.querySelector("#prepare-mob").style.display = "block";
      document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
      document.querySelector("#btn-connect-mob").setAttribute("disabled", "disabled")
      await fetchAccountData(provider);
      document.querySelector("#btn-connect").removeAttribute("disabled")
      document.querySelector("#btn-connect-mob").removeAttribute("disabled")
    }
    
    async function onConnect() {
    
      console.log("Opening a dialog", web3Modal);
      try {
        provider = await web3Modal.connect();
      } catch(e) {
        console.log("Could not get a wallet connection", e);
        return;
      }
    
      provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
      });
    
      provider.on("chainChanged", (chainId) => {
        fetchAccountData();
      });
    
      provider.on("networkChanged", (networkId) => {
        fetchAccountData();
      });
    
      await refreshAccountData();
    }
    
    async function onDisconnect() {
    
      console.log("Killing the wallet connection", provider);
    
      if(provider.close) {
        await provider.close();
        await web3Modal.clearCachedProvider();
        provider = null;
      }
    
      selectedAccount = null;
      document.querySelector("#prepare").style.display = "block";
      document.querySelector("#prepare-mob").style.display = "block";
      document.querySelector("#connected").style.display = "none";
      document.querySelector("#connected-mob").style.display = "none";
    }
    
    
    window.addEventListener('load', async () => {
      init();
      document.querySelector("#btn-connect").addEventListener("click", onConnect);
      document.querySelector("#btn-connect-mob").addEventListener("click", onConnect);
      document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
      document.querySelector("#btn-disconnect-mob").addEventListener("click", onDisconnect);
    });

    const HEADER = document.querySelector('.js-fixed-header');
    const CLASS_FIXED = 'fixed';

    const heightScroll = 1;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= heightScroll) {
        HEADER.classList.add(CLASS_FIXED);
      } else {
        HEADER.classList.remove(CLASS_FIXED);
      }
    });

    ///slider

    const smallSlider = document.querySelector('.js-accountant-slider');

    if (smallSlider) {
      const accountantInit = new Swiper('.js-accountant-slider', {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 800,
        centerInsufficientSlides: true,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
      });
    }

    $('a[href^="#"]').click(function () {
      var href = $.attr(this, 'href')

      $('.js-burger-open').removeClass('active')
      $('.js-burger').removeClass('active')
      $('body').removeClass('overflow')

      $('html, body').animate({
          scrollTop: $(href).offset().top,
        },
        500,
      )
      return false
    });

    const loader = document.querySelector('.preloader');

    document.body.onload = function () {
      if (loader) {
        setTimeout(function () {
          let preloader = document.getElementById('preloader');
          if (!preloader.classList.contains('done')) {
            preloader.classList.add('done')
          }
        }, 1000)
      }
    };




    $('.video').parent().click(function () {
      if ($(this).children(".video").get(0).paused) {
        $(this).children(".video").get(0).play();
        $(this).children(".playpause").fadeOut();
      } else {
        $(this).children(".video").get(0).pause();
        $(this).children(".playpause").fadeIn();
      }
    });

  });
})(jQuery);

