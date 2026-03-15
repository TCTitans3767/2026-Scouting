import cv2
import csv
from pyzbar.pyzbar import decode
import os
from tkinter import messagebox

# Name of the CSV file
CSV_FILE = 'scouted-qualitative.csv'

def decode_qr_code(image):
    """Decodes QR codes from a single image frame."""
    decoded_objects = decode(image)
    for obj in decoded_objects:
        # Assuming the data is a comma-delimited string
        data = obj.data.decode('utf-8')
        return data
    return None

def write_to_csv(data_string):
    """Appends comma-delimited data to a CSV file."""
    try:
        # Split the string into a list of items
        data_list = data_string.replace('"','').split(',')
        
        # Open the file in append mode ('a') with newline=''
        with open(CSV_FILE, mode='a', newline='') as file:
            writer = csv.writer(file)
            # Write the list as a single row in the CSV
            writer.writerow(data_list)
        print(f"Data saved to {CSV_FILE}: {data_list}")
        messagebox.showinfo("Success", "Data was scanned")
    except Exception as e:
        print(f"Error writing to CSV: {e}")

def scan_webcam():
    """Opens webcam and continuously scans for QR codes."""
    # Open the webcam (0 is usually the default camera)
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    print(f"Scanning for QR codes. Press 'q' to quit. Data will be saved to {CSV_FILE}.")

    # Keep track of previously scanned QR codes to avoid duplicates in a single session
    scanned_data = set()

    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()
        if not ret:
            break

        # Decode QR code from the frame
        decoded_data = decode_qr_code(frame)

        if decoded_data and decoded_data not in scanned_data:
            print(f"QR Code detected: {decoded_data}")
            write_to_csv(decoded_data)
            scanned_data.add(decoded_data)
        
        # Display the resulting frame
        cv2.imshow('Webcam QR Scanner', frame)

        # Break the loop on 'q' key press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the capture and destroy windows
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # Create the CSV file with headers if it doesn't exist (optional, adjust headers as needed)
    try:
        if not os.path.exists(CSV_FILE):
            with open(CSV_FILE, mode='w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(["EventKey", "MatchLevel", "MatchNumber","Alliance","Position","TeamNum","TeamName","AutoPath","Speed","DriverRating","Pinning","Balance","IllegalContact","SafeZone","Broken","Shooter","ClimbTime","Comments","ScoutedTime"]) # Replace with your actual headers
    except Exception as e:
        print(f"Error creating CSV file: {e}")
        
    scan_webcam()