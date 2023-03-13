"use strict"

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector(".btn--scroll-to")
const section1 = document.querySelector("#section--1")
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnCloseModal = document.querySelector(".btn--close-modal")
const btnsOpenModal = document.querySelectorAll(".btn--show-modal")

const openModal = function () {
	modal.classList.remove("hidden")
	overlay.classList.remove("hidden")
}

const closeModal = function () {
	modal.classList.add("hidden")
	overlay.classList.add("hidden")
}

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal))

btnCloseModal.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal()
	}
})

btnScrollTo.addEventListener("click", function (e) {
	const s1coords = section1.getBoundingClientRect()
	console.log(s1coords)

	console.log(e.target.getBoundingClientRect())

	console.log("Current  scroll (X/Y)", window.pageXOffset, window.pageYOffset)
	console.log(
		"width/height",
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	)

	// Scrolling					x-coord				y-coord
	// window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

	// window.scrollTo({
	// 	left: s1coords.left + window.pageXOffset,
	// 	top: s1coords.top + window.pageYOffset,
	// 	behavior: "smooth"
	// })

	section1.scrollIntoView({ behavior: "smooth" })
})

/////////////////////////////////////////////////////////////////////////////////////
// Page navigation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
	e.preventDefault()

	//Matching strategy
	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href")
		console.log(id)
		document.querySelector(id).scrollIntoView({ behavior: "smooth" })
	}
})

// document.querySelectorAll(".nav__link").forEach(function (el) {
// 	el.addEventListener("click", function (e) {
// 		e.preventDefault()
// 		const id = this.getAttribute("href")
// 		console.log(id)
// 		document.querySelector(id).scrollIntoView({ behavior: "smooth" })
// 	})
// })

/////////////////////////////////////////////////////////////////////////////////////
// Tabbed Component
const tabsContainer = document.querySelector(".operations__tab-container")
const tabs = document.querySelectorAll(".operations__tab")
const tabsContent = document.querySelectorAll(".operations__content")

tabsContainer.addEventListener("click", function (e) {
	const clicked = e.target.closest(".operations__tab")

	// Guard clause
	if (!clicked) return

	// Remove active classes
	tabs.forEach((tab) => tab.classList.remove("operations__tab--active"))
	tabsContent.forEach((content) =>
	content.classList.remove("operations__content--active")
	)
	// Active tab
	clicked.classList.add("operations__tab--active")

	// Activate content area
	console.log(clicked.dataset.tab)
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList.add("operations__content--active")
})

/* 
console.log(document.documentElement)
console.log(document.head)
console.log(document.body)

const header = document.querySelector(".header")
const allSections = document.querySelectorAll(".section")
console.log(allSections)

document.getElementById("section--1")
const allButtons = document.getElementsByTagName("button")
console.log(allButtons)

console.log(document.getElementsByClassName("btn"))
// Creating and inserting elements
const message = document.createElement("div")
message.classList.add("cookie-message")
message.textContent = "We use cookies for improved functionality and analytics."
message.innerHTML =
	"We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>"

// header.prepend(message)
header.append(message)
// header.append(message.cloneNode(true))

// header.before(message)
header.after(message)

// Delete elements
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
	//message.parentElement.removeChild(message)
	message.remove()
})

console.log("STYLES =======================================")
// Styles
message.style.backgroundColor = "#37383d"
message.style.width = "120%"

console.log(getComputedStyle(message).height)

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"

document.documentElement.style.setProperty("--color-primary", "orangered")

console.log("ATTRIBUTES =======================================")

// Attributes
const logo = document.querySelector(".nav__logo")
console.log(logo.alt)
console.log(logo.src)
console.log(logo.className)

console.log(logo.nonStandardAttribute)

console.log(logo.getAttribute("nonStandardAttribute"))
logo.setAttribute("company", "Bankist")
console.log(logo.src)
console.log(logo.getAttribute("src"))

const link = document.querySelector(".nav__link--btn")
console.log(link.href)
console.log(link.getAttribute("href"))

// Data attributes
console.log(logo.dataset.versionNumber)

//Classes
logo.classsList.add("c", "j") // set more than one class
logo.classList.remove("c", "j")
logo.classList.toggle("c")
logo.classList.contains("c")

// Don't use (overwrite other classes)
location.className = "jonas"
 */

// BUTTON SCROLLING

/* 
const h1 = document.querySelector("h1")

const alertH1 = (e) => {
	alert("Event activated!")
}

// h1.onmouseenter = (e) => {
// 	alert("Event activated!")
// }

h1.addEventListener("mouseenter", alertH1)

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000)
 */

// const randomInt = (min, max) =>
// 	Math.floor(Math.random() * (max - min + 1) + min)

// const randomColor = () => {
// 	return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)},${randomInt(
// 		0,
// 		255
// 	)})`
// }

// document.querySelector(".nav__links").addEventListener("click", function (e) {
// 	this.style.backgroundColor = randomColor()
// 	console.log("CONTAINER", e.target, e.currentTarget)
// })
// document.querySelector(".nav__link").addEventListener("click", function (e) {
// 	this.style.backgroundColor = randomColor()
// 	console.log("LINK", e.target, e.currentTarget)
// Stop propagation
// 	e.stopPropagation()
// })
// document.querySelector(".nav").addEventListener(
// 	"click",
// 	function (e) {
// 		this.style.backgroundColor = randomColor()
// 		console.log("NAV", e.target, e.currentTarget)
// 	},
// 	true
// )
/* 
// DOM TRAVERSING
const h1 = document.querySelector("h1")

// Going downwards: child
console.log("CHILDS")
console.log(h1.querySelectorAll(".highlight"))
console.log(h1.childNodes)
console.log(h1.children)
h1.firstElementChild.style.color = "white"
h1.lastElementChild.style.color = "orangered"

// Going upwards. prarents
console.log("PARENTS")
console.log(h1.parentNode)
console.log(h1.parentElement)
h1.closest(".header").style.background = "var(--gradient-secondary)"
h1.closest("h1").style.background = "red" /* the element itself-
 */
/*  
// Going sideways: siblings
console.log("SIBLINGS")
console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)
console.log(h1.previousSibling)
console.log(h1.nextSibling)
const childrens = h1.parentElement.children
const childrenLength = h1.parentElement.children.length
for (let el of childrens){
	console.log(el)
	if(el !== h1) el.style.transform = 'scale(0.5)'
}
*/
