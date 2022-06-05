package com.ibm.student.enrollment.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import net.sf.json.JSONArray;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class FileParserUtils {
	
	private static final Logger LOG = LogManager.getLogger(FileParserUtils.class);
	private static final ClassLoader LOADER = FileParserUtils.class.getClassLoader();
	
	
	public static JSONArray createJsonArrayFromPath(final String path) {

		String json = getJsonFromFile(path);
		//JSONObject jsonObject = JSONObject;
		//JSONArray jsonArray = new JSONArray(json); 
        //JSONObject finalObject = JSONObject.fromObject(json);
        return JSONArray.fromObject(json);
	}
	
	 /**
   	 * Method for getJsonFromFile.
   	 * @param filename -File Name
   	 * @return String  -its return string value or null
   	 */
    public static String getJsonFromFile(final String filename) {
        URL url = LOADER.getResource(filename);

        try {
            URLConnection urlConnection = url.openConnection();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(
                    urlConnection.getInputStream()));
            String inputLine;
            StringBuilder stringBuilder = new StringBuilder();
            while ((inputLine = bufferedReader.readLine()) != null) {
                stringBuilder.append(inputLine);
            }
            bufferedReader.close();

            return stringBuilder.toString();

        } catch (Exception e) {
            LOG.info(e);
        }

        return null;
    }
 
}
