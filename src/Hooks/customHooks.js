export const getAllvehiclesData = async () => {
    try {
        const response = await fetch(
            `https://cors.bridged.cc/https://vehicletrack.biz/api/companyvehiclelatestinfo?token=C_3BD0B0A02B`,
            {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    'x-cors-api-key': 'temp_1dbd8648144996688913b65b8b471359'
                },
            }
        );
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Fetch Error:", error);
    }

}