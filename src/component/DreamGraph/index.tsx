import * as d3 from "d3"
import { useEffect, useState } from "react"
import { getRandom } from "../ClickHeart"
import "./index.less"
import ReactDOMClient from "react-dom/client"

type DreamGraphData = {
    todo: string
}[]


function calcSize(length) {
    return Math.ceil(Math.sqrt(length))
}

function r(m, n) {
    return (Math.random() * (n - m) + m).toFixed(2) } 

const getBackgroundNode = (ContainerId: string, width: number, height: number) => {
    const svg = d3
        .select(`#${ContainerId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "chart")
        .style("background", "linear-gradient(#16161d, #1f1f3a, #3b2f4a)")

    svg.append("g")
        .selectAll("circle")
        .data(new Array(120).fill(0))
        .enter()
        .append("circle")
        .attr("class", "star")
        .attr("cx", () => r(0, 100) + "%")
        .attr("cy", () => r(0, 100)+"%")
        .attr("r", () => r(0, 2))
        .style("animation-delay", () => r(0, 2)+"s")

    svg.append("g")
        .append("text")
        .style("transform", () => `translate(${width-100}px,${height-86}px)`)
        .style('font-weight', 500)
        .style('font-family', 'Arial')
        .style("font-size", '16px')
        .style("text-anchor", "middle")
        .style("letter-spacing", "2px")
        .style("fill", "white")
        .selectAll("tspan")
        .data(["我向流星许下心愿", "希望我爱的人和爱我的人", "今生幸福平安"])
        .enter()
        .append("tspan")
        .attr("dy", "24px")
        .attr("x", 0)
        .text(d => d)

    return svg
}

const addCircle = (svg, data: DreamGraphData) => {
    const circles = svg
        .append("g")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", "2px")
        .attr("r", (d) => { return calcSize(d.todo.length)*12})
        .attr("fill", () => getRandom())
    
    return circles
}

const addText = (svg, data: DreamGraphData) => {
    const textsNode = svg
        .append("g")
        .style('font-weight', 500)
        .style('font-family', 'Arial')
        .style("font-size", '14px')
        .style("text-anchor", "middle")
        // .style("dominant-baseline", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .style("fill", "white")
        .attr("y", (d) => { return -Math.ceil(d.todo.length/ calcSize(d.todo.length))*16/2})

        textsNode
            .selectAll("tspan")
            .data(d => {
                let count = calcSize(d.todo.length)
                let result = []
                let number = count
                for(;number<d.todo.length;number+=count) 
                    result.push(d.todo.substring(number-count, number))
                result.push(d.todo.substring(number-count, d.todo.length))
                return result
            })
            .enter()
            .append("tspan")
            .text(d => {return d})
            .attr("dy", "16px")
            .attr("x", 0)

    return textsNode
}

const addPhysicalSystem = (svg, data: DreamGraphData, width, height, simulationNodes, simulationText) => {
    const simulation = d3
        .forceSimulation(data as any)
        .force("collide", d3.forceCollide().radius(d => calcSize((d as any).todo.length)*12+1))
        // .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))

        simulation.alphaDecay(0.05)
        // simulation.force("collide").strength(1).iterations(2)
        simulationNodes.call(d3.drag().on("start", started).on("drag", dragged).on("end", ended))
        function started(event, d) {
            if (!d.active) simulation.alphaTarget(0.2).restart()
            d.fx = d.x // fx fy 表示节点一下次节点被固定的位置
            d.fy = d.y
        }
    
        function dragged(event, d) {
            d.fx = event.x
            d.fy = event.y
        }
    
        function ended(event, d) {
            if (!d.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
        }
    
        simulation.on("tick", ticked)
    
        function ticked() {
            simulationNodes.attr("cx", (d) => { return d.x}).attr("cy", (d) => d.y)
            simulationText.style("transform", d => `translate(${d.x}px,${d.y}px)`)
            // .attr("x", (d) => d.x).attr("y", (d) => d.y)
        }
}

const addClickEvent = (svg, clickEvent) => {
    svg.selectAll("circle")
    .on("click", (event, d) => clickEvent(event, d))
}

export const DreamGraph = (props) => {
    const {ContainerId, data, clickEvent} = props

    const [rootNode, setRootNode] = useState(null);

    const [svgNode, setSVGNode] = useState<d3.Selection<SVGSVGElement, unknown, HTMLElement, any>>(null);
    
    useEffect(() => {
        const width = window.innerWidth
        const height = window.innerHeight

        const svg = getBackgroundNode(ContainerId, width, height)

        // Dream nodes
        const simulationNodes = addCircle(svg, data)

        // Text nodes
        const simulationText = addText(svg, data)

        addPhysicalSystem(svg, data, width, height, simulationNodes, simulationText)

        addClickEvent(svg, clickEvent)

        setSVGNode(svg)
    }, [data])

    useEffect(() => {
        const div = document.getElementById("chart")

        // 在第一次渲染时创建根节点
        if (div && !rootNode) {
            const root = ReactDOMClient.createRoot(div);
            setRootNode(root); 
        } else if (rootNode && svgNode) {
            const node = svgNode.node()

            console.log(node, "---")

            rootNode.render(svgNode.node());
        }

        return () => {
            if (svgNode) {
                svgNode.remove()
            }
        }
    }, [data, rootNode, svgNode])

    useEffect(() => {

    }, [])


    return (
        <div id="chart" />
    )
}
