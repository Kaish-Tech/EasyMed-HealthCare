package com.qsp.Hospital_Management.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.qsp.Hospital_Management.model.Appointment;
import com.qsp.Hospital_Management.repo.AppointmentRepository;

@Repository
public class AppointmentDao {

	@Autowired
    private AppointmentRepository appointmentRepository;

    // Save appointment
    public Appointment saveAppointment(Appointment appointment) {
    	
        return appointmentRepository.save(appointment);
    }

    // Get all appointments
    public List<Appointment> fetchAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Get appointment by ID
    public Appointment fetchAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElse(null);
    }

    // Delete appointment
    public boolean deleteAppointmentById(Long appointmentId) {
       if(appointmentRepository.existsById(appointmentId)) {
    	   
    	   appointmentRepository.deleteById(appointmentId);
    	   return true;
       }else {
    	   return false;
       }
    }

    // Update appointment (same as save, if ID exists)
    public Appointment updateAppointmentById(Long oldAppointmentId,Appointment newAppointment) {
    	newAppointment.setAppointmentId(oldAppointmentId);
    	return appointmentRepository.save(newAppointment);
    }
    
    public List<Appointment> fetchAppointmentsByDate(LocalDate appointmentDate) {
        return appointmentRepository.findByAppointmentDate(appointmentDate);
    }
}
