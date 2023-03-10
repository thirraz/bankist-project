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

/////////////////////////////////////////////////////////////////////////////////////
// Page navigation

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
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

	window.scrollTo({
		left: s1coords.left + window.pageXOffset,
		top: s1coords.top + window.pageYOffset,
		behavior: "smooth"
	})

	section1.scrollIntoView({ behavior: "smooth" })
})
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

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const randomColor = () => {
	return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)},${randomInt(0, 255)})`
}

document.querySelector(".nav__links").addEventListener("click", function (e) {
	this.style.backgroundColor = randomColor()
	console.log("CONTAINER", e.target, e.currentTarget)
})
document.querySelector(".nav__link").addEventListener("click", function (e) {
	this.style.backgroundColor = randomColor()
	console.log("LINK", e.target, e.currentTarget)

	// Stop propagation
	e.stopPropagation()
})
document.querySelector(".nav").addEventListener(
	"click",
	function (e) {
		this.style.backgroundColor = randomColor()
		console.log("NAV", e.target, e.currentTarget)
	},
	true
)
