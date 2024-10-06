#!/bin/bash

# Set the output directory
OUTPUT_DIR="assets"
INPUT_DIR="android/app/build/outputs/apk/release/app-release.apk"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Run the React Native build command
echo "Running npx react-app..."
cd android && ENVFILE=.env.production ./gradlew assembleRelease || { echo "Error running npx react-app"; exit 1; }

# Check if source file exists
if [ ! -f "$INPUT_DIR" ]; then
    echo "Error: Source file not found."
    exit 1
fi

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully."
    
    # COpy the build output to the /builds directory
    cp -p "$INPUT_DIR" "$OUTPUT_DIR"
    
    echo "Build artifacts moved to $OUTPUT_DIR"
else
    echo "Build failed. Please check the logs for details."
fi

echo "Script execution completed."
