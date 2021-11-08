// class Game {
//   constructor() {
//     this.numbersAPI = new Array();
//     this.cards = new Array();
//     this.actualLevel;
//     this.squareLevel = [10];
//     this.choseOne;
//     this.choseTwo;
//     this.nChoseCards = 0;
//     this.winCounter = 0;
//     this.moves = 0;
//     this.loadingContainer = document.getElementById('loading');
//     this.movesContainer = document.getElementById('moves');
//     this.container = document.getElementById('game');
//     this.time = true;
//     this.dataAPI = {
//       loading: true,
//       error: null,
//       data: {
//         info: {},
//         results:[]
//       }
//     }

//     //Timer 
//     this.firstMove = false;
//     this.hour = 0;
//     this.minutes = 0;
//     this.seconds = 0;
//     this.decimals = 0;
//     this.timeString = '';
//     this.stop = true;
//   }

//   fetchCharacters = async () => {
//     this.dataAPI = {loading: true, error: null};
//     try {
//       const response = await fetch(`https://rickandmortyapi.com/api/character/`);
//       const data = await response.json();

//       this.dataAPI = {
//         loading: false,
//         data: {
//           info: data.info,
//           results: data.results
//         }
//       }
//     } catch (error) {
//       this.dataAPI = {loading: false, error: error};
//     }
//   }

//   async startGame() {
//     this.actualLevel = 0;
//     this.choseCard = this.choseCard.bind(this);
//     await this.fetchCharacters();

//     for(let i = 0; i < this.dataAPI.data.info.count; i++) {
//       this.numbersAPI.push(i + 1);
//     }

//     this.numbersAPI = this.numbersAPI.sort(() => {
//       return Math.random() - 0.5;
//     });

//     this.numbersAPI.length = 10;

//     const LengthStatic = this.numbersAPI.length;

//     for(let i = 0; i < LengthStatic; i++) {
//       this.numbersAPI.push(this.numbersAPI[i]);
//     }

//     this.cards.length = this.numbersAPI.length;

//     this.numbersAPI = this.numbersAPI.sort(() => {
//       return Math.random() - 0.5;
//     })

//     for(let i = 0; i < this.cards.length; i++) {
//       this.temporalCharacter = {};

//       try {
//         const response = await fetch(`https://rickandmortyapi.com/api/character/${this.numbersAPI[i]}`);
        
//         const data = await response.json();
//         this.temporalCharacter = data;
//       } catch (error) {
//         this.temporalCharacter = {error: error};
//       }

//       this.cards[i] = document.createElement('div');
//       this.cards[i].classList.add('card');
//       this.cards[i].innerText = this.numbersAPI[i];
//       this.cards[i].setAttribute('data-position', i);
//       this.cards[i].addEventListener('click', this.choseCard);
//       this.cards[i].innerHTML = `
//       <div class="front turnFront" data-position="${i}"></div>
//       <div class="back turnBack" data-position="${i}" style="background-image: url(${this.temporalCharacter.image});></div>`;

//       this.container.appendChild(this.cards[i]);
//     }
//     this.loadingContainer.style.display = 'none';
//     this.container.style.display = 'flex';
//   }

//   addEvents(n) {
//     this.cards[n].addEventListener('click', this.choseCard);
//   }

//   deleteEvents(n) {
//     this.cards[n].removeEventListener('click', this.choseCard);
//   }

//   choseCard(e) {
//     if(this.time === true) {
//       switch(this.nChoseCards) {
//         case 0: 
//           if(!this.firstMove) {
//             this.startTimer();
//           }

//           this.firstMove = true;
//           this.choseOne = e.target.dataset.position;
//           this.cards[this.choseOne].classList.add('rotate');
//           this.deleteEvents(this.choseOne);
//           this.nChoseCards++;
//           this.moves++;
//           this.movesContainer.innerText = `Moves: ${this.moves}`;
//           break;
//         case 1: 
//           this.moves++;
//           this.movesContainer.innerText = `Moves: ${this.moves}`;
//           this.choseTwo = e.target.dataset.position;
//           this.cards[this.choseTwo].classList.add('rotate');
          
//           if(this.numbersAPI[this.choseOne] === this.numbersAPI[this.choseTwo]) {
//             console.log('Correct');
//             this.deleteEvents(this.choseTwo);
//             this.winCounter++;
//             if(this.winCounter === this.squareLevel[this.actualLevel]){
//               setTimeout(() => {
//                 this.victory();
//               }, 1000);
//             }
//           } else {
//             console.log('Wrong');
//             this.time = false;
//             setTimeout(() => {
//               this.cards[this.choseOne].classList.remove('rotate');
//               this.cards[this.choseTwo].classList.remove('rotate');
//             }, 1000);
//             this.addEvents(this.choseOne);
//           }
//           this.nChoseCards = 0;
//           break;
//       }
//     } 
//   }

//   victory() {
//     this.stopTime();
//     swal(
//       'You Win!',
//       `Moves: ${this.moves} \n\n Time: ${this.timeString}`,
//       'Success'
//     ).then(() => {
//       console.log('Hi');
//     })
//   }
  
//   newGame() {
//     location.reload();
//   }

//   // getRndInteger(min, max) {
//   //   return Math.floor(Math.random() * (max - min + 1)) + min;
//   // }

//   //Timer
//   startTimer() {
//     if(this.stop == true) {
//       this.stop = false;
//       this.timer();
//     }
//   }

//   timer() {
//     if(this.stop === false) {
//       this.decimals++;
//       if(this.decimals > 9) {
//         this.decimals = 0;
//         this.seconds++;
//       }
//       if(this.seconds > 59) {
//         this.seconds = 0;
//         this.minutes++;
//       }
//       if(this.minutes) {
//         this.minutes = 0;
//         this.hour++;
//       }
//       this.showTimer();
//       setTimeout('start.timer()', 100);
//     }
//   }

//   showTimer() {
//     if(this.hour < 10) this.timeString = '';
//     else this.timeString = this.hour;

//     if(this.minutes < 10) this.timeString = this.timeString + '0';
//     this.timeString = this.timeString + this.minutes + ':';

//     if(this.seconds < 10) this.timeString = this.timeString + '0';
//     this.timeString = this.timeString + this.seconds;
//     document.getElementById('time').innerHTML = this.timeString;
//   }

//   stopTime() {
//     this.stop = true;
//   }

//   restartTime() {
//     if(this.stop == false) {
//       this.stop = true;
//     }

//     this.hour = this.minutes = this.seconds = this.decimals = 0;
//     this.time = '';
//     this.showTimer();
//   }

// }

// const start = new Game();
// start.startGame();

class Game {
	constructor() {
		this.numbersAPI = new Array()
		this.cards = new Array()
		this.actualLevel
		this.squareLevel = [10]
		this.chosedOne
		this.chosedTwo
		this.nCardsChosed = 0
		this.winsCounter = 0
		this.moves = 0
		this.containerLoading = document.getElementById('loading')
		this.containerMoves = document.getElementById('moves')
		this.container = document.getElementById('game')
		this.time = true
		this.dataAPI = {
			loading: true,
			error: null,
			data: {
				info: {},
				results: []
			}
		}
		//timer
		this.firstMove = false
		this.hour = 0
		this.minuts = 0
		this.secunds = 0
		this.decimals = 0
		this.tiempo = ''
		this.stop = true
	}

	fetchCharacters = async () => {
		this.dataAPI = { loading: true, error: null }

		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
			const data = await response.json()

			this.dataAPI = {
				loading: false,
				data: {
					info: data.count,
					results: data.results
				}
			}
		} catch (error) {
			this.dataAPI = { loading: false, error: error }
		}
	}

	async startGame() {
		this.actualLevel = 0
		this.choseCard = this.choseCard.bind(this)
		await this.fetchCharacters()

		for (let i = 0; i < 500; i++) { 
			this.numbersAPI.push(i + 1)
		}

		this.numbersAPI = this.numbersAPI.sort(function() {
			return Math.random() - 0.5
		})

		this.numbersAPI.length = 10

		const LengthStatic = this.numbersAPI.length

		for (let i = 0; i < LengthStatic; i++) {
			this.numbersAPI.push(this.numbersAPI[i])
		}

		this.cards.length = this.numbersAPI.length

		this.numbersAPI = this.numbersAPI.sort(function() {
			return Math.random() - 0.5
		})
		for (let i = 0; i < this.cards.length; i++) {
			this.pokemon = {}

			try {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${this.numbersAPI[i]}`
				)
				const data = await response.json()

				this.pokemon = data
			} catch (error) {
				this.pokemon = { error: error }
			}

			this.cards[i] = document.createElement('div')
			this.cards[i].classList.add('card')
			this.cards[i].innerText = this.numbersAPI[i]
			this.cards[i].setAttribute('data-position', i)
			this.cards[i].addEventListener('click', this.choseCard)
			this.cards[i].innerHTML =
				'<div class="front turnFront" data-position="' +
				i +
				'"></div><div class="back turnBack" data-position="' +
				i +
				'" style="background-image: url(' +
				this.pokemon.sprites.front_default +
				');">' +
				'' +
				'</div>'
			this.container.appendChild(this.cards[i])
		}
		this.containerLoading.style.display = 'none'
		this.container.style.display = 'flex'
	}

	addEvent(n) {
		this.cards[n].addEventListener('click', this.choseCard)
	}

	deleteEvent(n) {
		this.cards[n].removeEventListener('click', this.choseCard)
	}

	choseCard(e) {
		if (this.time === true) {
			switch (this.nCardsChosed) {
				case 0:
					if (!this.firstMove) {
						this.startTimer()
					}
					this.firstMove = true
					this.chosedOne = e.target.dataset.position
					this.cards[this.chosedOne].classList.add('rotate')
					this.deleteEvent(this.chosedOne)
					this.nCardsChosed++
					this.moves++
					this.containerMoves.innerText = `Moves: ${this.moves}`
					break
				case 1:
					this.moves++
					this.containerMoves.innerText = `Moves: ${this.moves}`
					this.chosedTwo = e.target.dataset.position
					this.cards[this.chosedTwo].classList.add('rotate')
					if (
						this.numbersAPI[this.chosedOne] ===
						this.numbersAPI[this.chosedTwo]
					) {
						this.deleteEvent(this.chosedTwo)
						this.winsCounter++
						if (this.winsCounter === this.squareLevel[this.actualLevel]) {
							setTimeout(() => {
								this.victory()
							}, 1000)
						}
					} else {
						this.time = false
						setTimeout(() => {
							this.cards[this.chosedOne].classList.remove('rotate')
							this.cards[this.chosedTwo].classList.remove('rotate')
							this.time = true
						}, 1000)
						this.addEvent(this.chosedOne)
					}
					this.nCardsChosed = 0
					break
			}
		}
	}

	victory() {
		this.stopTimer()
    
		swal(
			'You Winner!',
			`Moves: ${this.moves} \n\n Time: ${this.tiempo}`,
			'success'
		)
	}

	newGame() {
		location.reload()
	}

	//timer
	startTimer() {
		if (this.stop == true) {
			this.stop = false
			this.timer()
		}
	}

	timer() {
		if (this.stop == false) {
			this.decimals++
			if (this.decimals > 9) {
				this.decimals = 0
				this.secunds++
			}
			if (this.secunds > 59) {
				this.secunds = 0
				this.minuts++
			}
			if (this.minuts > 59) {
				this.minuts = 0
				this.hour++
			}
			this.showTimer()
			setTimeout('start.timer()', 100)
		}
	}
	showTimer() {
		if (this.hour < 10) this.tiempo = ''
		else this.tiempo = this.hour
		if (this.minuts < 10) this.tiempo = this.tiempo + '0'
		this.tiempo = this.tiempo + this.minuts + ':'
		if (this.secunds < 10) this.tiempo = this.tiempo + '0'
		this.tiempo = this.tiempo + this.secunds
		document.getElementById('time').innerHTML = this.tiempo
	}
	stopTimer() {
		this.stop = true
	}
}

const start = new Game()
start.startGame()
