document.getElementById("calc").onclick = function () {

    var laser_typ = document.getElementById("laser_typ").value;
    var lasers_ship = document.getElementById("lasers_ship").value;
    var ship_designs = document.getElementById("ship_designs").value;
    var lasers_drones = document.getElementById("lasers_drones").value;
    var lasers_drones_designs = document.getElementById("lasers_drones_designs").value;
    var resource = document.getElementById("resource").value;
    var upgrades = document.getElementById("upgrades").value;
    var dronesFormations = document.getElementById("formations").value;

    var dmg =+ calculation_dmg(laser_typ, lasers_ship, ship_designs,lasers_drones, lasers_drones_designs, resource)
    var dmg_without_resources =+ calculation_dmg(laser_typ, lasers_ship, ship_designs,lasers_drones, lasers_drones_designs, resource, "WITHOUT_RESOURCES")
    var dmg_standard =+ calculation_dmg(laser_typ, lasers_ship, ship_designs, lasers_drones, lasers_drones_designs, resource, "STANDARD")


    document.getElementById("standard_result").innerText = "Standardní výpočet bez desingu a formací: " +  dmg_standard + " DMG"
    document.getElementById("without_resources").innerText = "Výsledek bez zdrojů: " +  dmg_without_resources + " DMG"
    document.getElementById("full_result").innerText = "Kompletní výsledek: " +  dmg + " DMG"
}

/**
 * @description Tato metoda vrací procenta dmg podle zvoleného typu laseru,
 * kalkulačka počítá s tím že zvolený laser bude jak v letounu tak v lodi.
 * @return number
 */
function select_lasers_dmg(laserTyp) {
    const lasers = [
        {name: "LF_3", dmg: 150},
        {name: "LF_4", dmg: 200},
        {name: "PROMETHEUS", dmg: 210 + 200}
    ]
    return lasers.filter(subject => subject.name === laserTyp)
        .map((e) => {
            return e.dmg;
    })
}

/**
 * @description Tato metoda vrací procenta dmg podle zvoleného goliáš desingu
 * @return number
 */
function select_shipDesign(shipDesigns) {
    if (ship_designs === undefined)
        return 0
    if (ship_designs === "NOTHING")
        return 0

    const data = [
        { name: "ENFORCER", dmg: 5 }, 
        { name: "VANQUISHER", dmg: 7 }, 
        { name: "PEACEMAKER", dmg: 7 }, 
        { name: "SOVEREIGN", dmg: 7 }, 
        { name: "SURGEON", dmg: 7 }, 
        { name: "REFEREE", dmg: 5 }, 
        { name: "GOLIATH_CHAMPION", dmg: 5 }, 
        { name: "GOLIATH_X", dmg: 2 }, 
        { name: "DIMINISHER", dmg: 5 }, 
        { name: "VENOM", dmg: 5 }, 
        { name: "CYBORG", dmg: 10 }
    ]

    return data.filter(subject => subject.name === shipDesigns)
        .map((e) => {
            return e.dmg;
    })
}

/**
 * @description Tato metoda vrací procenta dmg z letounových desingů
 * @return number
 */
function select_dronesDesign(lasers_drones_designs) {
    const data = [
        {name: "NOTHING", dmg: 0}, 
        {name: "HERCULES", dmg: 0}, 
        {name: "HAVOC", dmg: 10}
    ]

    return data.filter(subject => subject.name === lasers_drones_designs)
    .map((e) => {
        return e.dmg;
    })
}

/**
 * @description Tato metoda vrací procenta dmg z vesmírných zdrojů 
 * @return number
 */
function select_Resources(resource) {
    if (resource === "NOTHING")
        return 0
    
    const resources = [
        {name: "PROMERIUM", dmg: 30},
        {name: "SEPROM", dmg: 60}
    ]
    return resources.filter(subject => subject.name === resource)
        .map((e) => {
            return e.dmg;
    })
}

/**
 * @description Tato metoda počítá vylepšení laserů.
 * @return number
 */
function calculation_of_upgrades(laserTyp, upgrades) {
    if (upgrades === "NO")
        return 0
    else if (upgrades === "YES")
        return 0
}

/**
 * @description Tato metoda bere dmg z formace.
 * @return number
 */
 function select_droneFormation(droneFormation) {
    var formations = [
        {name: "HEART", dmg: 5}, 
        {name: "RING", dmg: 25},
        {name: "DRILL", dmg: 20}
    ]

    return formations.filter(subject => subject.name === droneFormation)
        .map((e) => {
            return e.dmg
    })
}

/**
 * @description Metoda pro výpočet procent
 * @return percentage
 */
function percentage(num, per) {
    return (num / 100) * per;
}

/**
 * @description Tato metoda vypočítá všechny podmínky a věci které jsou potřeba.
 * @return number
 */
function calculation_dmg(laserTyp, lasersShip, shipDesigns, lasers_drones, lasers_drones_designs, resource,type) {
    if (lasers_drones > 20)
        return 20


    var dmg_from_ship = + select_lasers_dmg(laserTyp) * lasersShip + percentage(select_lasers_dmg(laserTyp) * lasersShip, select_shipDesign(shipDesigns))
    var dmg_from_drones = + select_lasers_dmg(laserTyp) * lasers_drones + percentage(select_lasers_dmg(laserTyp) * lasers_drones, select_dronesDesign(lasers_drones_designs))
    var dmg_from_resources =+ percentage(dmg_from_ship + dmg_from_drones, select_Resources(resource))
    var dmg_total = dmg_from_ship + dmg_from_drones + dmg_from_resources
    var final_dmg = dmg_total

    if (type === "STANDARD") {
        final_dmg = select_lasers_dmg(laserTyp) * lasersShip + select_lasers_dmg(laserTyp) * lasers_drones
    } else if (type === "WITHOUT_RESOURCES") {
        final_dmg = dmg_from_ship + dmg_from_drones
    }

    return final_dmg
}