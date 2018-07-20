import '../../scss/modules/modal_speedbump/modal_speedbump.scss';
///////////////////////////////////////
// Dialog Object
///////////////////////////////////////
class Dialog {
	constructor(dialogNode) {
		this.dialogNode = dialogNode;
		this.closeNode = this.dialogNode.querySelector('.close-dialog');
		this.continueNode = this.dialogNode.querySelector('.continue');
		this.triggerNodes = document.querySelectorAll('.' + this.dialogNode.getAttribute('trigger-class'));
		this.inputNodes = Array.prototype.slice.call(dialogNode.querySelectorAll('select:not([disabled]), input:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href], area[href], iframe, object, embed, *[tabindex], *[contenteditable]'));
		this.lastFocusNode;
        this.windowScroll = {x:0, y:0};
		this.isSpeedbump = false;
		this.iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (this.dialogNode.classList.contains('speedbump-overlay')) {
            this.isSpeedbump = true;
        }
	
		this.keysMap = Object.freeze({
			'tab': 9,
			'escape': 27
		});
	
		for (const i of this.triggerNodes) {
			i.addEventListener('click', this.handleClick_triggerNodes.bind(this));
		}

		this.dialogNode.addEventListener('keydown', this.handleKeyDown.bind(this));
		this.dialogNode.addEventListener('click', this.handleClick.bind(this));
	}

	handleClick_triggerNodes(event) {
		event.preventDefault();
		this.lastFocusNode = event.currentTarget;
		if (!this.iOS) {
			document.querySelector('html').classList.add('dialog-no-scrolling');
			document.querySelector('body').classList.add('dialog-no-scrolling');
		} else {
			this.windowScroll.x = window.pageXOffset;
			this.windowScroll.y = window.pageYOffset;
			document.querySelector('html').classList.add('dialog-no-scrolling-iOS');
			document.querySelector('body').classList.add('dialog-no-scrolling-iOS');
			document.querySelector('body').style.top = '-' + this.windowScroll.y + 'px';
		}
        this.dialogNode.classList.remove('hidden');
        
        if (this.isSpeedbump) {
    		if (this.continueNode) {
                this.continueNode.href = event.currentTarget.href;
                this.continueNode.focus();
            } else {
                const firstInput = this.getVisibleInputs()[0];
                if (firstInput) {
                    firstInput.focus();
                }
            }        
        } else {
            if(this.closeNode) {
                this.closeNode.focus();
            } else {
                const firstInput = this.getVisibleInputs()[0];
                if (firstInput) {
                    firstInput.focus();
                }
            }
        }
	}

	closeDialog () {
		if (!this.iOS) {
			document.querySelector('html').classList.remove('dialog-no-scrolling');
			document.querySelector('body').classList.remove('dialog-no-scrolling');
		} else {
			document.querySelector('html').classList.remove('dialog-no-scrolling-iOS');
			document.querySelector('body').classList.remove('dialog-no-scrolling-iOS');
			document.querySelector('body').style.top = '';
			window.scrollTo(this.windowScroll.y, this.windowScroll.y);
		}
		this.dialogNode.classList.add('hidden');
		this.lastFocusNode.focus();
	}

	handleClick (event) {
		switch (true) {
			case (event.target === this.closeNode):
				this.closeDialog();
				break;
			case (event.target === this.dialogNode):
				this.closeDialog();
				break;
			case (this.isSpeedbump && event.target === this.continueNode):
				this.closeDialog();
                break;
            case (!this.isSpeedbump && event.target.tagName.toLowerCase() === 'a'):
				this.closeDialog();
				break;
		}
	}

	handleKeyDown (event) {
		var keycode = event.keyCode || event.which;
		var visibleInputs;
		switch (true) {
			case (event.keyCode === this.keysMap.escape):
				//Escape
				this.closeDialog();
				break;
			case (event.keyCode === this.keysMap.tab && event.shiftKey):
				//Shift + Tab
				visibleInputs = this.getVisibleInputs();
				if (event.target === visibleInputs[0]) {
					// if the focus is in the first element	
					event.preventDefault();
					visibleInputs[visibleInputs.length - 1].focus();
					break;
				}
			case (event.keyCode === this.keysMap.tab && !event.shiftKey):
				//Tab
				visibleInputs = this.getVisibleInputs();
				if (event.target === visibleInputs[visibleInputs.length - 1]) {
					// if the focus is in the last element
					event.preventDefault();
					visibleInputs[0].focus();
					break;
				}
		}
	}

	getVisibleInputs () {
		var visibleInputNodes = [];
		for (const inputNode of this.inputNodes) {
			if (inputNode.offsetHeight && inputNode.offsetWidth) {
				visibleInputNodes.push(inputNode);
			}
		}
		return visibleInputNodes
	}
}
var dialogInit = () => {
		const dialogNodes = document.querySelectorAll('.modal-overlay, .speedbump-overlay');
		for (const i of dialogNodes) {
			new Dialog(i);
		}	
}
export { dialogInit };
///////////////////////////////////////
// document.addEventListener('DOMContentLoaded', function () {
// 	const dialogNodes = document.querySelectorAll('.modal-overlay, .speedbump-overlay');
// 	for (const i of dialogNodes) {
// 		new Dialog(i);
// 	}	
// }, false);