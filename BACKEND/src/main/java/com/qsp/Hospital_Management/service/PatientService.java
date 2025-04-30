package com.qsp.Hospital_Management.service;

import java.util.List;


import com.qsp.Hospital_Management.model.Patient;

public interface PatientService {

	// Method to save a new patient
    Patient savePatient(Patient patient);

    // Method to get all patients
    List<Patient> fetchAllPatients();

    // Method to get a patient by ID
    Patient fetchPatientById(Long patientId);

    // Method to update a patient
    Patient updatePatientById(Long patientId, Patient patient);

    // Method to delete a patient
    boolean deletePatientById(Long patientId);
    
    List<Patient> searchPatientsByName(String patientName);

    List<Patient> filterPatientsByGender(String patientGender);

}
