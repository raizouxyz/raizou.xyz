document.addEventListener("click", (e) => {
	createLightning(e.clientX, e.clientY);
});

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
	card.addEventListener("mousemove", (e) => {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -10;
		const rotateY = ((x - centerX) / centerX) * 10;

		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	});

	card.addEventListener("mouseleave", () => {
		card.style.transform =
			"perspective(1000px) rotateX(0deg) rotateY(0deg)";
	});
});

function createLightning(x, y) {
	const bolt = document.createElement("div");
	bolt.className = "lightning-bolt";
	bolt.style.left = x + "px";
	document.body.appendChild(bolt);

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "100");
	svg.setAttribute("height", y + 50);
	svg.style.position = "absolute";
	svg.style.left = "-50px";
	svg.style.top = "0";

	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	const lightning = generateLightningPath(50, 0, 50, y);
	path.setAttribute("d", lightning);
	path.setAttribute("stroke", "#fff");
	path.setAttribute("stroke-width", "3");
	path.setAttribute("fill", "none");
	path.setAttribute("filter", "url(#glow)");
	path.className = "lightning-path";

	svg.appendChild(path);
	bolt.appendChild(svg);

	setTimeout(() => {
		bolt.remove();
		impact.remove();
	}, 300);
}

function generateLightningPath(startX, startY, endX, endY) {
	let path = `M ${startX} ${startY}`;
	const segments = 8;
	const segmentHeight = (endY - startY) / segments;
	let currentX = startX;
	let currentY = startY;

	for (let i = 1; i <= segments; i++) {
		const nextY = startY + segmentHeight * i;
		const offset = (Math.random() - 0.5) * 40;
		const nextX = i === segments ? endX : startX + offset;
		path += ` L ${nextX} ${nextY}`;
		currentX = nextX;
		currentY = nextY;
	}

	return path;
}
