document.addEventListener("click", (e) => {
	createLightning(e.clientX, e.clientY);
});

function createLightning(x, y) {
	// 雷のボルト
	const bolt = document.createElement("div");
	bolt.className = "lightning-bolt";
	bolt.style.left = x + "px";
	document.body.appendChild(bolt);

	// SVGで雷を描画
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

	// クリーンアップ
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
