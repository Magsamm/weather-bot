import pandas as pd

def csv_to_js(csv_file_path, output_js_file_path):
    df = pd.read_csv(csv_file_path)
    
    # Assuming the CSV file has columns 'city', 'lat', and 'lng'
    city_coordinates = {}
    for index, row in df.iterrows():
        # Handle city names with single quotes by escaping them
        city_name = row['city'].lower().replace(' ', '').replace("'", "\\'")
        latitude = row['lat']
        longitude = row['lng']
        city_coordinates[city_name] = {'latitude': latitude, 'longitude': longitude}

    # Format as a JavaScript object
    js_content = "const cityCoordinates = {\n"
    for city, coords in city_coordinates.items():
        js_content += f"    '{city}': {{ latitude: '{coords['latitude']}', longitude: '{coords['longitude']}' }},\n"
    js_content += "};\n\nmodule.exports = cityCoordinates;"

    # Write to a JS file
    with open(output_js_file_path, 'w') as file:
        file.write(js_content)

# Example usage
csv_file_path = 'worldcities.csv'  # Replace with your CSV file path
output_js_file_path = 'cityCoordinates.js'
csv_to_js(csv_file_path, output_js_file_path)
