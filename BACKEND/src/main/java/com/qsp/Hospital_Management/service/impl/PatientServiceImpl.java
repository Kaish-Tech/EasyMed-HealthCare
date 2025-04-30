package com.qsp.Hospital_Management.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qsp.Hospital_Management.dao.PatientDao;
import com.qsp.Hospital_Management.model.Patient;
import com.qsp.Hospital_Management.service.PatientService;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientDao patientDao;
	
	@Override
	public Patient savePatient(Patient patient) {
		return patientDao.savePatient(patient);
	}

	@Override
	public List<Patient> fetchAllPatients() {
		return patientDao.fetchAllPatients();
	}

	@Override
	public Patient fetchPatientById(Long patientId) {
		return patientDao.fetchPatientById(patientId);
	}

	@Override
	public Patient updatePatientById(Long oldPatientId, Patient patient) {
		return patientDao.updatePatientById(oldPatientId, patient);
	}

	@Override
	public boolean deletePatientById(Long patientId) {
		return patientDao.deletePatientById(patientId);
	}
	
	@Override
	public List<Patient> searchPatientsByName(String name){
		    return patientDao.searchPatientsByName(name);
	}

	@Override
	public List<Patient> filterPatientsByGender(String patientGender) {
		return patientDao.filterPatientsByGender(patientGender);
	}


}
